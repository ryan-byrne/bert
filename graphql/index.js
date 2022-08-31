const { ApolloServer } = require("apollo-server-express");

const graphqlUser = {
  id:process.env.GRAPHQL_USER,
  email:"graphql@berkeleycarroll.org",
  name:"GraphQL User",
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