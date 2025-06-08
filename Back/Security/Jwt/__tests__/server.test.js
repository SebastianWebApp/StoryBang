import request from 'supertest';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import app from '../server.js';  // Importamos app desde server.js

dotenv.config();

describe('JWT Service', () => {

 let server;

    beforeAll(async () => {
        server = app.listen(0); // Use port 0 for random available port
    });

   afterAll(done => {
        server.close(done); // cerramos servidor y le decimos a Jest que terminó
    });


    const SECRET = process.env.JWT_SECRET_KEY || 'default_secret_key';

    describe('POST /Create_Jwt', () => {
        it('should create a JWT token when valid ID is provided', async () => {
            const response = await request(app)
                .post('/Create_Jwt')
                .send({ Id: 'test123' });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('Status', true);
            expect(response.body).toHaveProperty('Content');
            expect(response.body.Response).toBe('Security created successfully');

            const decodedToken = jwt.verify(response.body.Content, SECRET);
            expect(decodedToken).toHaveProperty('Id', 'test123');
        });

        it('should return 400 when ID is not provided', async () => {
            const response = await request(app)
                .post('/Create_Jwt')
                .send({});

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                Status: false,
                Response: "ID es requerido"
            });
        });
    });

    describe('POST /Verify_Jwt', () => {
        it('should verify a valid token', async () => {
            const token = jwt.sign({ Id: 'test123' }, SECRET, { expiresIn: '1h' });

            const response = await request(app)
                .post('/Verify_Jwt')
                .send({ Token: token });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                Status: true,
                Response: "Valid token",
                Id: { Id: 'test123', iat: expect.any(Number), exp: expect.any(Number) }
            });
        });

        it('should return 401 when token is not provided', async () => {
            const response = await request(app)
                .post('/Verify_Jwt')
                .send({});

            expect(response.status).toBe(401);
            expect(response.body).toEqual({
                Status: false,
                Response: "Session expired. Please log in again."
            });
        });

        it('should return 401 for invalid token', async () => {
            const response = await request(app)
                .post('/Verify_Jwt')
                .send({ Token: 'invalidtoken' });

            expect(response.status).toBe(401);
            expect(response.body).toEqual({
                Status: false,
                Response: "Invalid token or session expired. Please log in again."
            });
        });
    });

    
});
