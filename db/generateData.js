const { imageUrls, restaurantNames } = require('./data.js');
const db = require('./schema.js');

const generateRandomNumBtwRange = (a, b) => (
  Math.floor((Math.random() * (b - a))) + a
);

const generateNumsArr = (n) => {
  const numbers = [];
  for (let i = 0; i < n; i += 1) {
    numbers.push(i);
  }
  return numbers;
};

const generateNRandomIndicesFromQ = (q, n) => {
  const nums = generateNumsArr(q);
  const output = [];
  let i = nums.length - 1;
  while (i >= nums.length - n) {
    const k = Math.floor((Math.random() * i + 1));
    output.push(nums[k]);
    [nums[k], nums[i]] = [nums[i], nums[k]];
    i -= 1;
  }
  return output;
};

const getNRandomUrls = () => {
  const n = generateRandomNumBtwRange(10, 16);
  const nRandomIndices = generateNRandomIndicesFromQ(imageUrls.length, n);
  return nRandomIndices.map(index => (imageUrls[index]));
};

const generateNRecords = (n) => {
  const output = [];
  for (let i = 0; i < n; i += 1) {
    output.push({
      restaurantId: i,
      name: restaurantNames[i % restaurantNames.length],
      photos: getNRandomUrls(),
    });
  }
  return output;
};

const records = generateNRecords(100);

db.Photo.insertMany(records, (err) => {
  if (err) {
    console.log('Error inserting 100 records to database');
  } else {
    console.log('Database for photos and 100 records created!');
  }
});

// run node db/generateData.js
