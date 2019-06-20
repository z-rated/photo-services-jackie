/* eslint-disable no-console */
require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
const path = require('path');
const db = require('./pgQuery.js');

const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/restaurant/photo/:id', db.redisGetPhotosByRestId);
app.get('/photo/:id', db.getSinglePhoto);
app.post('/photo', db.createPhoto);
app.put('/photo/:id', db.updatePhoto);
app.delete('/photo/:id', db.deletePhoto);


app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
