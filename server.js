const path = require('path');
const express = require('express');
const middleware = require('express-mock-api-middleware');
const cors = require('cors')

// Creating express app
const app = express();

// Server settings
const host = 'localhost';
const port = 5000;


// Resolving middleware on mock directory
const middlewareResolver = middleware(
  path.resolve(__dirname, 'mock')
);

// use / as base path
app.use('/api', middlewareResolver, cors({origin: '*'}));

// Run and listen app
app.listen(port, host, error => {
  if (error) {
    console.error(error);
    return;
  }
  console.info('Running mocked APIs. Base path:');
  console.info(`http://${host}:${port}/api/`)
});