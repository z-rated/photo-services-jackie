const mongoose = require('mongoose');
const { photoSchema, seedDatabase } = require('../db/schema');

process.env.MONGO_URI = 'mongodb://localhost/restaurantphotos-test';

describe('Database methods', () => {
  let Photo;

  beforeEach(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    await mongoose.connection.dropDatabase();
    Photo = mongoose.model('Photo', photoSchema);
  });

  afterEach(async (done) => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    done();
  });

  test('seeds database with 1 record', async (done) => {
    const record = [{ restaurantId: 1, name: 'De Kas', photos: ['image1', 'image2'] }];
    await seedDatabase(record);
    Photo.countDocuments({}, (err, result) => {
      if (err) throw err;
      expect(result).toBe(1);
      done();
    });
  });

  test('seeds database with multiple records', async (done) => {
    const records = [
      { restaurantId: 1, name: 'De Kas', photos: ['image1', 'image2'] },
      { restaurantId: 2, name: 'Suhring', photos: ['image1', 'image2'] },
      { restaurantId: 3, name: 'Odette', photos: ['image1', 'image2'] }];
    await seedDatabase(records);
    Photo.countDocuments({}, (err, result) => {
      if (err) throw err;
      expect(result).toBe(3);
      done();
    });
  });
});
