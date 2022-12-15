// Import All Deps
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const {connect} = require('mongoose');
const {json} = require('body-parser');
const {resolve} = require('path');

// Local Deps
const {auth, authMiddleware} = require('./auth');
const apolloServer = require('./graphql/index');

// Express App
const app = express();

// Is Production
const isProduction = process.env.NODE_ENV === 'production'

// Middleware
const corsOptions = {
  credentials:true,
  origin:[process.env.SERVER_URL, "https://studio.apollographql.com"]
}

app.use(cors(corsOptions));
app.use(json());
app.use(session({
  proxy:isProduction,
  name:"bert_session",
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,
  store:MongoStore.create({
    mongoUrl:`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}/${process.env.MONGO_DB}`
  }),
  cookie:{
    secure: isProduction,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 29
  }
}));
app.use(authMiddleware);

// Auth Route
app.use('/auth', auth);

// Client Route
if (isProduction){
  app.use(express.static(resolve(__dirname, "build")));
  app.get('*', (req, res) => res.sendFile(resolve( __dirname, "build", "index.html" )))  
}

// Apollo Server
apolloServer.start()
  .then(resp => {
    console.log('Started Apollo Server...');
    apolloServer.applyMiddleware({
      app, 
      cors:corsOptions,
      path:'/graphql'
    })
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