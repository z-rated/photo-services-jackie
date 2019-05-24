const faker = require('faker');
const db = require('./schema.js');
const { imageUrls, restaurantNames } = require('./data.js');

const generateNums = (n) => {
  const numbers = [];
  for (let i = 0; i < n; i += 1) {
    numbers.push(i);
  }
  return numbers;
};

const generate100Records = () => {
  const records = [];
  for (let i = 0; i < 100; i += 1) {
    const n = faker.random.number({ min: 15, max: 20 });
    let arr = generateNums(30);
    faker.helpers.shuffle(arr);
    arr = arr.slice(0, n).map(num => imageUrls[num]);

    records.push({
      restaurantId: i + 1,
      name: faker.random.arrayElement(restaurantNames),
      photos: arr,
    });
  }

  return records;
};

const records = generate100Records();
db.seedDatabase(records);
