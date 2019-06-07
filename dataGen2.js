const fs = require('fs');
const faker = require('faker');

const filePath = '/Users/jackieye/csv-file/csv-2.txt';

const writeStream = fs.createWriteStream(filePath);

const headerRest = 'restaurantId,restaurantName' + '\n';
function writeRestaurantTable(writer, encoding, callback) {
  let i = 10000000;
  let restaurantId = 0;
  writeStream.write(headerRest);
  function write() {
    let ok = true;
    do {
      i -= 1;
      restaurantId += 1;
      const restaurantName = faker.company.companyName();
      const data = `${restaurantId},${restaurantName},\n`;
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
writeRestaurantTable(writeStream, 'utf-8', () => {
  writeStream.end();
});

writeStream.on('finish', () => {
  // eslint-disable-next-line no-console
  console.log('Write success.');
});
// eslint-disable-next-line no-console
console.log('Write stream to file complete.');
