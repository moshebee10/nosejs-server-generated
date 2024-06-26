/**
 * Main server file for the Calculator API.
 * This file sets up and starts an HTTP server using Express.js and OAS Tools for API documentation.
 */

const http = require('http');
const express = require("express");
const oasTools = require("@oas-tools/core");
const cors = require('cors');
const app = express();
const { calculate } = require('./controllers/calculateController.js');
const { generateToken } = require('./controllers/tokenController.js');

// Middleware to parse JSON requests
app.use(express.json());

const serverPort = 8080;

// Enable CORS for all routes
app.use(cors());

// Route to generate JWT token
app.post('/token', generateToken);

// Route to perform arithmetic calculations
app.post('/calculate', calculate);

// Initialize OAS Tools with the Express app and start the HTTP server
oasTools.initialize(app).then(() => {
    http.createServer(app).listen(serverPort, () => console.log("Server started!"));
});

// Export the app for use in testing or other modules
module.exports = app;
