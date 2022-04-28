const mongoose = require('mongoose');

const LapSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  resource_state: Number,
  name: String,
  activity: {
    id: Number,
    resource_state: Number
  },
  athlete: {
    id: Number,
    resource_state: Number
  },
  elapsed_time: Number,
  moving_time: Number,
  start_date: Date,
  start_date_local: Date,
  distance: Number,
  start_index: Number,
  end_index: Number,
  total_elevation_gain: Number,
  average_speed: Number,
  max_speed: Number,
  average_cadence: Number,
  device_watts: Boolean,
  average_watts: Number,
  lap_index: Number,
  split: Number,
});

module.exports = mongoose.model('laps', LapSchema);
