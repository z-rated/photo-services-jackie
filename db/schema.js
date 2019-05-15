const mongoose = require('mongoose');
const { port } = require('../server/server.js');
mongoose.connect(`mongodb://localhost:${port}/photos`);

const Schema = mongoose.Schema;
const photoSchema = new Schema({
  restaurantId: Number,
  name: String,
  photos: [String],
});

photoSchema.index({ restaurantId: 1 });

const Photo = mongoose.model('Photo', photoSchema);

module.exports.Photo = Photo;