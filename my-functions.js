/* eslint-disable no-param-reassign */
const Faker = require('faker');

function generateRandomData(userContext, events, done) {
  // generate data with Faker:
  const date = `${Faker.date.recent()} `;
  const photourl = `${Faker.image.imageUrl()}`;
  const restaurantid = `${Faker.random.number({ min: 1, max: 10000000 })}`;
  // add variables to virtual user's context:
  userContext.vars.date = date;
  userContext.vars.photourl = photourl;
  userContext.vars.restaurantid = restaurantid;
  // continue with executing the scenario:
  return done();
}
module.exports = {
  generateRandomData,
};
