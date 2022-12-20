const { ApolloError } = require('apollo-server-express');
const { Router } = require('express');
const auth = Router();
const { google } = require("googleapis");
const user = require("./db/models/user");

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
  // Authorization Header Provided
  else if ( req.headers.authorization ) {
    const auth_token = req.headers.authorization.split(" ")[1];
    const resp = await user.findOne({auth_token});
    if (!resp) throw new ApolloError("Invalid authentication token...")
    else {
      req.session.user = JSON.parse( JSON.stringify(resp) );
      oauth2Client.setCredentials({...req.session.user.tokens});
      next()
    }
  }
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
    return isProduction ? res.redirect(authorizationUrl) : res.json({authorizationUrl})
  }
  else {
    oauth2Client.setCredentials({...req.session.user.tokens})
    next()
  }
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

  if (!req.session || !req.session.user) throw Error("No user session found...")
  else if ( !req.session.user.tokens ) throw Error("No user session tokens found...")
  else {
    const { tokens, auth_token, ...sessionUser } = req.session.user;
    const updatedUser = await user.updateOne({id:sessionUser.id},{"$set":{last_login:new Date().toISOString()}});
    return res.json({...sessionUser})
  }

})

auth.get("/callback", async (req, res, err) => {

  const { error, code } = req.query;

  if (error) return res.status(403).json(error);
  else {
    const {tokens} = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const userInfo = await google.oauth2({ version: "v2" }).userinfo.get();
    const mongoUser = await user.findOneAndUpdate(
      {id:userInfo.data.id},
      {...userInfo.data, tokens, last_login:new Date().toISOString()},
      {upsert: true, new: true, setDefaultsOnInsert: true}
    );
    req.session.user = mongoUser;
    console.log(`${req.session.user.id} Just Logged in.`);
    return res.redirect(process.env.CLIENT_URL)
  }

});

module.exports = { auth, google, oauth2Client, authMiddleware }