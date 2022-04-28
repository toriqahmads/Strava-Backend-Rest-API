const mongoose = require('mongoose');
const Segment = require('./segment');

const SegmentEffortSchema = new mongoose.Schema({
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
  average_cadence: Number,
  device_watts: Boolean,
  average_watts: Number,
  kom_rank: String,
  pr_rank: String,
  achievements: [String],
  hidden: Boolean,
  segment: Segment.schema
});

module.exports = mongoose.model('segment_efforts', SegmentEffortSchema);
