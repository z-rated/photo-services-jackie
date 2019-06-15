/* eslint-disable no-console */
const fs = require('fs');
const faker = require('faker');


// Data which will be wrote to text file.
const filePath = '/Users/jackieye/csv-file/csv.csv';

const writeStream = fs.createWriteStream(filePath);
// eslint-disable-next-line no-useless-concat
const header = 'photoId,date,photoUrl,restaurantId' + '\n';

function writeTenMillion(writer, encoding, callback) {
  let i = 70000000;
  let photoId = 0;
  writeStream.write(header);
  function write() {
    let ok = true;
    do {
      i -= 1;
      photoId += 1;
      console.log(i);
      const photoUrl = [];
      for (let j = 0; j <= 1000; j += 1) {
        photoUrl.push(faker.image.imageUrl());
      }
      const n = faker.random.number({ min: 1, max: 1000 });
      const photoUrls = photoUrl[n];
      const date = faker.date.recent();
      const restaurantId = faker.random.number({ min: 1, max: 10000000 });
      const data = `${photoId},${date},${photoUrls}, ${restaurantId}\n`;
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
