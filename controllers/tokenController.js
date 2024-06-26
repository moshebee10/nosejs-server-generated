/**
 * Token Controller for the Calculator API.
 * This file contains the logic to generate JWT tokens.
 */

const jwt = require('jsonwebtoken');

// Secret key used for signing the JWT
const secretKey = '123456';

/**
 * Function to generate a JWT token.
 * The token is signed with an empty payload and has an expiration time of 1 hour.
 *
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to send the token back to the client.
 */
module.exports.generateToken = function get(req, res) {
    // Generate a JWT token with an empty payload and an expiration time of 1 hour
    const token = jwt.sign(
        {},
        secretKey,
        { expiresIn: '1h' }
    );
    // Send the generated token back to the client
    res.json({ token: token });
}
