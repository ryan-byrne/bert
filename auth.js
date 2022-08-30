const {Router} = require('express');
const auth = Router();
const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.SERVER_URL}/auth/callback`
);

const isProduction = process.env.NODE_ENV === 'production'

google.options({ auth: oauth2Client });

const authMiddleware = async (req, res, next) => {

    // Ignore Callback
    if ( '/auth/callback' === req._parsedUrl.pathname ) next()
    // Ignore GraphQL TODO: FIX
    else if ( !isProduction && req.headers.origin === 'https://studio.apollographql.com' ) next()
    // No Session User, Redirect
    else if (!req.session.user) {
        const authorizationUrl = oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: [
              'profile', 
              'email',
              'https://www.googleapis.com/auth/calendar',
              'https://www.googleapis.com/auth/calendar.events',
              'https://www.googleapis.com/auth/classroom.rosters.readonly',
              'https://www.googleapis.com/auth/drive.file',
          ],
            include_granted_scopes: true
        });
        return res.json({authorizationUrl})
    } else next()
}

auth.get('/logout', async(req, res, err) => {
    try {
        const user = req.session.user.id;
        await oauth2Client.revokeCredentials();
        req.session.destroy((e)=>err(e));
        console.log(`${user} logged out`);
        res.redirect(`/`);
    } catch (e) {
        err(e)
    }
})

auth.get('/user', (req, res, err) => {
    const {tokens, ...resp} = req.session.user;
    res.json(resp);
})

auth.get("/callback", async (req, res, err) => {
    
    const {error, code} = req.query;

    if ( error ) return res.status(403).json(error);

    try {
        const {tokens} = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        const userInfo = await google.oauth2({version:"v2"}).userinfo.get();
        console.log(`New login from ${userInfo.data.id}`);
        req.session.user = {...userInfo.data, tokens};
        return res.redirect(process.env.CLIENT_URL)
    } catch (e) {
        console.error(e);
        return res.status(500).json(e);
    }
});

module.exports = {auth, google, oauth2Client, authMiddleware}