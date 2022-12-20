const {ApolloServer, ApolloError} = require("apollo-server-express");
const user = require('../db/models/user');

module.exports = new ApolloServer({
  typeDefs: require('./schema'),
  resolvers: require('./resolvers'),
  csrfPrevention: true,
  cache: 'bounded',
  context: async ({req}) => {
    const resp = await user.findOne({id: req.session.user.id })
    if (!resp) throw new ApolloError("Unable to validate request...")
    else return ({user:resp})
  }
});