/**
 * Calculate Controller for the Calculator API.
 * This file contains the logic to handle arithmetic operations on two numbers.
 */

const jwt = require('jsonwebtoken');

// Secret key used for verifying the JWT
const JWT_SECRET = '123456';

/**
 * Function to handle the POST request for arithmetic operations.
 * It validates the JWT, checks for required headers and request body, and performs the requested operation.
 *
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to send the result back to the client.
 */
module.exports.calculate = function post(req, res) {
    // JWT Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Missing authorization header' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Extract request data
        const { num1, num2 } = req.body;
        const operation = req.headers.operation;

        if (!operation) {
            return res.status(400).json({ error: 'Operation header is required.' });
        }
    
        if (typeof num1 !== 'number' || typeof num2 !== 'number') {
            return res.status(400).json({ error: 'Both num1 and num2 should be numbers.' });
        }

        if (num1 === undefined || num2 === undefined) {
            return res.status(400).json({ message: 'Invalid input' });
        }

        // Perform the requested operation
        let result;
        switch (operation) {
            case 'add':
                result = num1 + num2;
                break;
            case 'subtract':
                result = num1 - num2;
                break;
            case 'multiply':
                result = num1 * num2;
                break;
            case 'divide':
                if (num2 === 0) {
                    return res.status(400).json({ message: 'Cannot divide by zero' });
                }
                result = num1 / num2;
                break;
            default:
                return res.status(400).json({ message: 'Invalid operation' });
        }

        return res.status(200).json({ result });
    });
};
