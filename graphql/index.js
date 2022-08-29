const { ApolloServer } = require("apollo-server-express");

// _id
// 62e1dfee5345723a5063e37c
// id
// "00000000000000000000"
// email
// "test@berkeleycarroll.org"
// verified_email
// true
// name
// "Example User"
// given_name
// "Example"
// family_name
// "User"
// picture
// "https://lh3.googleusercontent.com/a-/AFdZucp0SHJfCqSNtZPxzFmOA29kPjJxb…"
// locale
// "en"
// hd
// "berkeleycarroll.org"
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