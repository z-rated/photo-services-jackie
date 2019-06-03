const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../db/schema.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/api/restaurants/:id/photos', (req, res) => {
  db.getPhotos(req.params.id, (err, result) => {
    if (err || !result) {
      res.status(404).send();
    } else {
      res.set('Cache-Control', 'public, max-age=31557600');
      res.status(200).send(result);
    }
  });
});

module.exports = app;
