const { Router } = require('express');
const auth = Router();
const { google } = require("googleapis");
const user = require("./db/models/user")

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.SERVER_URL}/auth/callback`
);

const isProduction = process.env.NODE_ENV === 'production'
google.options({ auth: oauth2Client });

const authMiddleware = async (req, res, next) => {

  // Ignore Callback
  if ('/auth/callback' === req._parsedUrl.pathname) next()
  // Ignore GraphQL TODO: FIX
  else if (!isProduction && req.headers.origin === 'https://studio.apollographql.com') next()
  // No Session User, Redirect
  else if (!req.session.user) {
    const authorizationUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        'profile',
        'email',
        'https://www.googleapis.com/auth/calendar.events.readonly',
        'https://www.googleapis.com/auth/calendar.events.owned',
        'https://www.googleapis.com/auth/classroom.rosters.readonly',
        'https://www.googleapis.com/auth/classroom.profile.emails',
        'https://www.googleapis.com/auth/classroom.courses.readonly',
        'https://www.googleapis.com/auth/drive.file',
      ],
      include_granted_scopes: true
    });
    return isProduction ? res.redirect(authorizationUrl) : res.json({ authorizationUrl })
  } else next()
}

auth.get('/logout', async (req, res, err) => {

  const user = req.session.user.id

  oauth2Client.revokeCredentials()
    .then(resp => console.log(`User ${user} revoked their credentials`))
    .catch(e => err(e))

  req.session.destroy((e) => {
    if (e) err(e)
    else {
      console.log(`${user} logged out`);
      res.json({ success: "You have successfully logged out" });
    }
  })

})

auth.get('/user', async (req, res, err) => {
  try {
    const { tokens, ...resp } = req.session.user;
    const userData = await user.findOne({email:resp.email});
    if ( userData ) {
      await user.updateOne({id:userData.id},{"$set":{last_login:new Date().toISOString()}});
      return res.json({...resp, admin:userData._doc.admin})
    } else {
      await user.create({
        ...resp,
        first_login: new Date().toISOString(),
        last_login: new Date().toISOString()
      })
      console.log(`Created a new user ${userData.id}`);
      return res.json({...resp})
    }
  } catch (e) {
    res.status(403).send("No user session found...")
  }
})

auth.get("/callback", async (req, res, err) => {

  const { error, code } = req.query;

  if (error) return res.status(403).json(error);

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const userInfo = await google.oauth2({ version: "v2" }).userinfo.get();
    console.log(`New login from ${userInfo.data.id}`);
    req.session.user = { ...userInfo.data, tokens };
    return res.redirect(process.env.CLIENT_URL)
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
});

module.exports = { auth, google, oauth2Client, authMiddleware }