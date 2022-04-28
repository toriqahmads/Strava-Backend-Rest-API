const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  primary: {
    id: {
      type: String,
      default: null
    },
    unique_id: String,
    urls: {
      "100": String,
      "600": String
    },
    source: Number,
  },
  use_primary_photo: Boolean,
  count: Number
});

module.exports = mongoose.model('photos', PhotoSchema);
