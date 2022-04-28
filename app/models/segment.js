const mongoose = require('mongoose');

const SegmentSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  resource_state: Number,
  name: Number,
  activity_type: String,
  distance: Number,
  average_grade: Number,
  maximum_grade: Number,
  elevation_high: Number,
  elevation_low: Number,
  start_latlng: [Number],
  end_latlng: [Number],
  climb_category: String,
  city: String,
  state: String,
  country: String,
  private: Boolean,
  hazardous: Boolean,
  starred: Boolean
});

module.exports = mongoose.model('segments', SegmentSchema);
