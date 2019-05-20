const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server/app.js');

describe('GET /api/restaurants/:id/photos', () => {
  beforeEach(() => {
    mongoose.connect('mongodb://localhost/restaurantphotos', { useNewUrlParser: true });
  });
  afterEach((done) => {
    mongoose.disconnect(done);
  });

  afterAll(done => setImmediate(done));

  test('It should respond with status code 200', async () => {
    const response = await request(app).get('/api/restaurants/1/photos');
    expect(response.statusCode).toBe(200);
  });

  test('It should respond with an array of 10 - 15 urls', async (done) => {
    const response = await request(app).get('/api/restaurants/26/photos');
    const regex = /https:\/\/s3\.amazonaws\.com\/eugeniazagatphotos\/\w{10}\.jpg/;
    expect(response.body.length).toBeGreaterThanOrEqual(10);
    expect(response.body.length).toBeLessThanOrEqual(15);
    expect(response.body[0]).toMatch(regex);
    done();
  });
});
