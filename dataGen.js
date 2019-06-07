/* eslint-disable no-console */
const fs = require('fs');
const faker = require('faker');


// Data which will be wrote to text file.
const filePath = '/Users/jackieye/csv-file/csv.txt';

const writeStream = fs.createWriteStream(filePath);
const header = 'photoId,photoUrl,date,restaurantId' + '\n';

// writeStream.write(header);

// for (let i = 0; i < 10000000; i += 1) {
//   const n = faker.random.number({ min: 0, max: 1000 });
//   const photoId = i + 1;
//   const photoUrl = fakeImages[n];
//   const restaurantId = faker.random.number({ min: 1, max: 100000000 });
//   const row = `${photoId},${photoUrl},${restaurantId}\n`;
//   writeStream.write(row);
// }
// writeStream.end();

// writeStream.on('finish', () => {
//   console.log('Write success.');
// });

// console.log('Write stream to file complete.')

function writeTenMillion(writer, encoding, callback) {
  let i = 70000000;
  let photoId = 0;
  writeStream.write(header);
  function write() {
    let ok = true;
    do {
      i -= 1;
      photoId += 1;
      const photoUrl = faker.image.imageUrl();
      const date = faker.date.recent();
      const restaurantId = Math.floor((Math.random() * 10000000) + 1);
      const data = `${photoId},${photoUrl},${date},${restaurantId},\n`;
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
writeTenMillion(writeStream, 'utf-8', () => {
  writeStream.end();
});

writeStream.on('finish', () => {
  console.log('Write success.');
});

console.log('Write stream to file complete.');
