const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/restaurantphotos');

const { Schema } = mongoose;
const photoSchema = new Schema({
  restaurantId: Number,
  name: String,
  photos: [String],
});

photoSchema.index({ restaurantId: 1 });

const Photo = mongoose.model('Photo', photoSchema);

module.exports.Photo = Photo;
