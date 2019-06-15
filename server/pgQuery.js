/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable radix */
// eslint-disable-next-line prefer-destructuring
const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'photos',
  password: 'Chow',
  port: 5433,
});

const getPhotosByRestaurantId = (request, response) => {
  const restaurantid = request.params.id;
  console.log('Got restaurant id', restaurantid);
  pool.query(`SELECT * FROM photo_table, rest_table where photo_table.restaurantid = ${restaurantid} AND rest_table.restaurantid = ${restaurantid}`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getSinglePhoto = (request, response) => {
  const photoid = request.params.id;
  console.log('Got photo id', photoid);
  pool.query(`SELECT * FROM photo_table where photoid = ${photoid}`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createPhoto = (request, response) => {
  // eslint-disable-next-line object-curly-newline
  const { date, photourl, restaurantid } = request.body;
  console.log('Post successful!', request.body);
  pool.query('INSERT INTO photo_table (date, photourl, restaurantid) VALUES ($1, $2, $3)', [date, photourl, restaurantid], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Photo added with info: ${request.body.date}, ${request.body.photourl}, ${request.body.restaurantid}`);
  });
};

const updatePhoto = (request, response) => {
  // eslint-disable-next-line radix
  const id = request.params;
  const { photourl, date, photoid } = request.body;
  console.log('Photo updated!');
  pool.query(
    'UPDATE photo_table SET photourl = $1, date = $2 WHERE photoid = $3', [photourl, date, photoid],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`photo modified with info: ${id}`);
    // eslint-disable-next-line comma-dangle
    }
  );
};

const deletePhoto = (request, response) => {
  const photoid = parseInt(request.params.id);
  console.log('Deleted');
  pool.query('DELETE FROM photo_table WHERE photoid = $1', [photoid], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Photo deleted with ID: ${photoid}`);
  });
};

module.exports = {
  getPhotosByRestaurantId,
  getSinglePhoto,
  createPhoto,
  updatePhoto,
  deletePhoto,
};
