const faker = require('faker');
const { imageUrls, restaurantNames } = require('./data.js');
const db = require('./schema.js');

const generateNums = (n) => {
  const numbers = [];
  for (let i = 0; i < n; i += 1) {
    numbers.push(i);
  }
  return numbers;
};

const records = [];

for (let i = 0; i < 100; i += 1) {
  const n = faker.random.number({ min: 10, max: 15 });
  let arr = generateNums(30);
  faker.helpers.shuffle(arr);
  arr = arr.slice(0, n).map(num => imageUrls[num]);

  records.push({
    restaurantId: i,
    name: faker.random.arrayElement(restaurantNames),
    photos: arr,
  });
}

db.Photo.insertMany(records, (err) => {
  if (err) {
    console.log('Error inserting 100 records to database');
  } else {
    console.log('Database for photos and 100 records created!');
  }
});

// node db/fakeData.js
