const { ApolloServer } = require("apollo-server-express");

// TODO Add Collection for Guesses

module.exports = new ApolloServer({
  typeDefs:require('./schema'),
  resolvers:require('./resolvers'),
  csrfPrevention: true,
  cache: 'bounded',
  context: ({req}) => ({
    session:req.session
  })
});