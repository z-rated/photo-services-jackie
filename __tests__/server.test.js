const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server/app.js');

describe('GET /api/restaurants/:id/photos', () => {
  let server;

  beforeAll(async (done) => {
    server = app.listen(0, done);
  });

  afterAll(async (done) => {
    await mongoose.connection.close();
    await server.close();
    done();
  });

  test('It should respond with status code 404 for a bad request', async () => {
    const response = await request(server).get('/api/restaurants/101/photos');
    expect(response.statusCode).toBe(404);
  });

  test('It should respond with status code 200 for a valid request', async () => {
    const response = await request(server).get('/api/restaurants/1/photos');
    expect(response.statusCode).toBe(200);
  });

  test('It should respond with the name of the restaurant', async () => {
    const response = await request(server).get('/api/restaurants/1/photos');
    expect(response.body.name).toBe('De Kas');
  });

  test('It should respond with an array of 10 - 15 urls', async () => {
    const response = await request(server).get('/api/restaurants/1/photos');
    const regex = /https:\/\/s3\.amazonaws\.com\/eugeniazagatphotos\/\w{10}\.jpg/;
    expect(response.body.photos.length).toBeGreaterThanOrEqual(10);
    expect(response.body.photos.length).toBeLessThanOrEqual(15);
    expect(response.body.photos[0]).toMatch(regex);
  });
});
