
// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
// Import routes
const appointmentsRouter = require('./routes/appointments-route');
// Set default port for express app
const PORT = process.env.PORT || 5000;
// Create express app
const app = express();
// Apply middleware
// Note: Keep this at the top, above routes
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

// Implement appointments route
app.use('/appointments', appointmentsRouter);

// Implement 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something is broken.');
})
// Implement 404 error route
app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.');
})
// Start express app
app.listen(PORT, function() {
  console.log(`Server is running on: ${PORT}`);
})