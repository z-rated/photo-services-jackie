const { imageUrls, restaurantNames } = require('./data.js');
const db = require('./schema.js');

const generateRandomNumBtwRange = (a, b) => {
  return Math.floor((Math.random() * (b - a))) + a;
};

const generateNumsArr = (n) => {
  let numbers = [];
  for (var i = 0; i < n; i++) {
    numbers.push(i);
  }
  return numbers;
};

const generateNRandomIndices = (arr, n) => {
  let output = [];
  let i = arr.length - 1;
  while (i >= arr.length - n) {
    let k = Math.floor((Math.random() * i + 1));
    output.push(arr[k]);
    [arr[k], arr[i]] = [arr[i], arr[k]];
    i--;
  }
  return output;
};

const getNRandomUrls = () => {
  let n = generateRandomNumBtwRange(10, 16);
  let nums = generateNumsArr(imageUrls.length);
  let nRandomIndices = generateNRandomIndices(nums, n);
  return nRandomIndices.map(index => (imageUrls[index]));
};

const generateNRecords = (n) => {
  let output = [];
  for (var i = 0; i < n; i++) {
    output.push({
      restaurantId: i,
      name: restaurantNames[i % restaurantNames.length],
      photos: getNRandomUrls(),
    });
  }
  return output;
};

let records = generateNRecords(100);

db.Photo.insertMany(records, (err, result) => {
  if (err) {
    console.log('Error inserting 100 records to database');
  } else {
    console.log('Database for photos and 100 records created!');
  }
});

// run node generateData.js