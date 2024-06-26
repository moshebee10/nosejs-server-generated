const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../index');

describe('Calculator API', () => {
    let token;

    beforeAll(() => {
        // Generate a token before running tests
        token = jwt.sign({}, '123456', { expiresIn: '1m' });
    });

    describe('POST /token', () => {
        it('should generate a JWT token', async () => {
            const res = await request(app)
                .post('/token');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
        });
    });

    describe('POST /calculate', () => {
        it('should return the sum of two numbers', async () => {
            const res = await request(app)
                .post('/calculate')
                .set('Authorization', `Bearer ${token}`)
                .set('operation', 'add')
                .send({ num1: 2, num2: 3 });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('result', 5);
        });

        it('should return the difference of two numbers', async () => {
            const res = await request(app)
                .post('/calculate')
                .set('Authorization', `Bearer ${token}`)
                .set('operation', 'subtract')
                .send({ num1: 5, num2: 3 });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('result', 2);
        });

        it('should return the product of two numbers', async () => {
            const res = await request(app)
                .post('/calculate')
                .set('Authorization', `Bearer ${token}`)
                .set('operation', 'multiply')
                .send({ num1: 2, num2: 3 });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('result', 6);
        });

        it('should return the quotient of two numbers', async () => {
            const res = await request(app)
                .post('/calculate')
                .set('Authorization', `Bearer ${token}`)
                .set('operation', 'divide')
                .send({ num1: 6, num2: 3 });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('result', 2);
        });

        it('should return an error when dividing by zero', async () => {
            const res = await request(app)
                .post('/calculate')
                .set('Authorization', `Bearer ${token}`)
                .set('operation', 'divide')
                .send({ num1: 6, num2: 0 });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message', 'Cannot divide by zero');
        });

        it('should return an error when operation is missing', async () => {
            const res = await request(app)
                .post('/calculate')
                .set('Authorization', `Bearer ${token}`)
                .send({ num1: 6, num2: 3 });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('error', 'Operation header is required.');
        });

        it('should return an error when JWT is missing', async () => {
            const res = await request(app)
                .post('/calculate')
                .set('operation', 'add')
                .send({ num1: 2, num2: 3 });

            expect(res.statusCode).toEqual(401);
            expect(res.body).toHaveProperty('message', 'Missing authorization header');
        });

        it('should return an error when JWT is invalid', async () => {
            const res = await request(app)
                .post('/calculate')
                .set('Authorization', 'Bearer invalidtoken')
                .set('operation', 'add')
                .send({ num1: 2, num2: 3 });

            expect(res.statusCode).toEqual(401);
            expect(res.body).toHaveProperty('message', 'Unauthorized');
        });
    });
});
