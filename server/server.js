
// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
// const jwt = require('express-jwt');
const jwt = require('jsonwebtoken');
// Import routes
const appointmentsRouter = require('./routes/appointments-route');
const usersRouter = require('./routes/users-route');
const config = require('./config');
// Set default port for express app
const PORT = process.env.PORT || 5000;
// Create express app
const app = express();
const knex = require('./db');

const graphqlExpress = require('apollo-server-express').graphqlExpress;
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./src/schema');
const User = require('./src/datasources/User');
const Car = require('./src/datasources/Car');
const resolvers = require('./src/resolver');
// Apply middleware
// Note: Keep this at the top, above routes
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// app.use(async (req, res, next) => {
//   let token = req.headers["x-access-token"];

//   if (!token) {
//     next();
//     return;
//   }

//   const userId = token === "67" ? token : jwt.verify(token, "SOME TOKEN");
//   if (!userId) {
//     res.status(403).send({ error: "Invalid token" });
//     return;
//   }
//   const user = await User.findByPk(userId);
//   if (!user) {
//     res.status(403).send({ error: "Invalid token" });
//     return;
//   }
//   req.user = user;
//   next();
// });

// set up any dataSources our resolvers need
const dataSources = () => ({
  car: new Car(),
  user: new User(),
});

// the function that sets up the global context for each resolver, using the req
const context = async ({ req }) => {
  // simple auth check on every request
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

// app.use('/graphql', graphqlExpress({
//     typeDefs,
//     resolvers,
//     dataSources: () => ({
//         launchAPI: new LaunchAPI()
//     })
// }));

server.listen(5000).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

// app.use(jwt({
//   secret: config.JWT_SECRET,
//   credentialsRequired: false,
//   algorithms: ['HS256'],
// }).unless({path: ['/api/users']}), 
// function(req, res, next) {
//   if (req.user) {
//     knex('users')
//       .where('id', req.user)
//       .then(([ user ]) => {
//         req.user = user;
//         next();
//       });
//   } else {
//     next();
//   }
// });


// app.use('/api/users', usersRouter);
// app.use('/api/appointments', appointmentsRouter);

// // Implement 500 error route
// app.use(function (err, req, res, next) {
//   console.error(err.stack);
//   res.status(500).send('Something is broken.');
// })
// // Implement 404 error route
// app.use(function (req, res, next) {
//   res.status(404).send('Sorry we could not find that.');
// })
// // Start express app
// app.listen(PORT, function() {
//   console.log(`Server is running on: ${PORT}`);
// })