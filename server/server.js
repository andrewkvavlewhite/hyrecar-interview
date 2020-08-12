const jwt = require('jsonwebtoken');
const config = require('./config');
const PORT = process.env.PORT || 5000;
const knex = require('./db');

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./src/schema');
const User = require('./src/datasources/User');
const Car = require('./src/datasources/Car');
const resolvers = require('./src/resolver');

const dataSources = () => ({
  car: new Car(),
  user: new User(),
});

const context = async ({ req }) => {
  const bearerAuth = req.headers && req.headers.authorization;
  if (bearerAuth) {
    const jwtToken = bearerAuth.split('Bearer ')[1];
    const userId = jwt.verify(jwtToken, config.JWT_SECRET);
    const [user] = await knex('users').where('id', userId);
    if (user) {
      user.token = jwtToken;
      return { user }
    }
  }
  return {};
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    context
});

server.listen(PORT).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});