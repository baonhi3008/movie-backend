const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const  router = require('../src/routers/api/index')
const generateBaseResponse = require('./utils/baseResponse');

const app = express();

// Middlewares

// Json Parser
app.use(express.json());

// Form parser
app.use(express.urlencoded({
  extended: true,
}));

// Use cors
app.use(cors());

// Routes
app.use('/api/v1', router);

// Handle 404 Not Found
app.use((req, res) => {
  res.status(404).json(generateBaseResponse(null, 'Endpoint Not Found!'));
});

// Error handler
app.use(errorHandler);

const server = app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is listening on port ${process.env.PORT || 3001}`);
});

module.exports = { app, server };