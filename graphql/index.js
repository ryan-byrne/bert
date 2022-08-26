const { ApolloServer } = require("apollo-server-express");

const graphqlUser = {
  _id:process.env.GRAPHQL_USER,
  tokens:{
    refresh_token:process.env.REFRESH_TOKEN
  }
}

module.exports = new ApolloServer({
  typeDefs:require('./schema'),
  resolvers:require('./resolvers'),
  csrfPrevention: true,
  cache: 'bounded',
  context: ({req}) => ({
    user: req.session.user ? req.session.user : process.env.NODE_ENV === 'development' ? graphqlUser : null
  })
});