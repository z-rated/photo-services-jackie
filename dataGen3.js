/* eslint-disable no-useless-concat */
/* eslint-disable no-console */
const fs = require('fs');
const faker = require('faker');

const filePath = './csv-file/cassandra.csv';
const writeStream = fs.createWriteStream(filePath);

const header = 'restaurantid|restaurantname|photosurls' + '\n';

const generateNums = (n) => {
  const numbers = [];
  for (let i = 0; i < n; i += 1) {
    numbers.push(i);
  }
  return numbers;
};

function writeTenCassandraMillion(writer, encoding, callback) {
  let i = 10000000;
  let restaurantid = 0;
  writeStream.write(header);
  function write() {
    let ok = true;
    do {
      i -= 1;
      restaurantid += 1;
      console.log(i);
      const photoUrl = [];
      for (let j = 0; j <= 1000; j += 1) {
        photoUrl.push(faker.image.imageUrl());
      }
      let arr = generateNums(1000);
      const n = faker.random.number({ min: 5, max: 10 });
      // array of photos from 5-10
      arr = arr.slice(0, n).map(num => photoUrl[num]);
      const dateArr = arr.slice(0, n).map(num => faker.date.recent());
      // eslint-disable-next-line prefer-template
      const restaurantname = faker.name.findName() + "'s";
      const photoUrls = arr;
      const date = dateArr;
      const data = `${restaurantid}|${restaurantname}|${JSON.stringify(photoUrls)}|${JSON.stringify(date)}\n`;
      if (i === 0) {
        writeStream.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writeStream.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writeStream.once('drain', write);
    }
  }
  write();
}
writeTenCassandraMillion(writeStream, 'utf-8', () => {
  writeStream.end();
});

writeStream.on('finish', () => {
  console.log('Write success.');
});

console.log('Write stream to file complete.');
