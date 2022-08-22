// Import All Deps
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const {connect} = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path')

// Local Deps
const {auth, checkAuthentication} = require('./auth');
const apolloServer = require('./graphql/index');

// Middleware
const corsOptions = {
  credentials:true,
  origin:process.env.CLIENT_URL
}
const app = express();
app.use(bodyparser.json());
app.use(cors(corsOptions));
app.use(session({
  name:"bert_session",
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,
  store:MongoStore.create({
    mongoUrl:`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}/${process.env.MONGO_DB}`
  }),
  cookie:{
    secret: process.env.SESSION_SECRET,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    httpOnly: true,
  }
}));
app.use(checkAuthentication);

if ( process.env.NODE_ENV === 'production' ){
  app.use('/', express.static('/client/build'))
} else {
  const compiled = require('webpack')(require('./webpack.config.js'))
  app.use( require('webpack-dev-middleware')(compiled) )
  app.use( require('webpack-hot-middleware')(compiled) )
}

// Set Paths
app.use('/auth', auth);
app.get("*", (req, res)=> res.sendFile( path.resolve(__dirname, 'client', 'build', 'index.html') ) );

// Apollo Server
apolloServer.start()
  .then( () => {
    console.log('Apollo Server Successfully Started');
    apolloServer.applyMiddleware({app, cors:corsOptions})
})

// Express Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Bert API Server is running at ${process.env.SERVER_URL}`);
  console.log(`Connecting to MongoDB at ${process.env.MONGO_URL}/${process.env.MONGO_DB}`)
  connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}/${process.env.MONGO_DB}`)
    .then( resp => console.log(`Connect to MongoDB at ${process.env.MONGO_URL}/${process.env.MONGO_DB}`) )
    .catch( err => console.error(err) )
});