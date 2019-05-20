const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../db/schema.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/restaurants/:id/photos', (req, res) => {
  db.getPhotos(req.params.id, (err, result) => {
    if (err) {
      res.status(404).send();
    } else {
      const urls = result.photos;
      res.status(200).send(urls);
    }
  });
});

module.exports = app;
