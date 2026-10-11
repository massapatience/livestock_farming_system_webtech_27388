const request = require('supertest');
const app = require('../src/app');

describe('Auth API', () => {
  it('POST /api/auth/register - should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test Farmer',
      email: `test_${Date.now()}@example.com`,
      password: 'password123',
      role: 'farmer',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('POST /api/auth/login - should fail with wrong credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'nonexistent@example.com',
      password: 'wrongpassword',
    });
    expect(res.statusCode).toBe(401);
  });

  it('GET /api/auth/me - should fail without token', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.statusCode).toBe(401);
  });
});
