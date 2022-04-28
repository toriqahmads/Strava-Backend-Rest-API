const mongoose = require('mongoose');

const SplitSchema = new mongoose.Schema({
  distance: Number,
  elapsed_time: Number,
  elevation_difference: Number,
  moving_time: Number,
  split: Number,
  average_speed: Number,
  pace_zone: Number,
});

module.exports = mongoose.model('splits', SplitSchema);
