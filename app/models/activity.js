const mongoose = require('mongoose');
const Gear = require('./gear');
const Split = require('./split');
const Photo = require('./photo');
const SegmentEffort = require('./segment-effort');
const HighlightedKudo = require('./highlighted-kudo');

const ActivitySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  resource_state: String,
  external_id: String,
  upload_id: Number,
  name: String,
  distance: Number,
  moving_time: Number,
  elapsed_time: Number,
  total_elevation_gain: Number,
  type: String,
  start_date: Date,
  start_date_local: Date,
  timezone: String,
  utc_offset: Number,
  start_latlng: [Number],
  end_latlng: [Number],
  achievement_count: Number,
  kudos_count: Number,
  comment_count: Number,
  athlete_count: Number,
  photo_count: Number,
  trainer: Boolean,
  commute: Boolean,
  manual: Boolean,
  private: Boolean,
  flagged: Boolean,
  gear_id: String,
  from_accepted_tag: Boolean,
  average_speed: Number,
  max_speed: Number,
  average_cadence: Number,
  average_temp: Number,
  average_watts: Number,
  weighted_average_watts: Number,
  kilojoules: Number,
  device_watts: Boolean,
  has_heartrate: Boolean,
  max_watts: Number,
  elev_high: Number,
  elev_low: Number,
  pr_count: Number,
  total_photo_count: Number,
  has_kudoed: Boolean,
  workout_type: Number,
  suffer_score: {
    type: Number,
    default: null
  },
  description: String,
  calories: Number,
  partner_brand_tag: {
    type: String,
    default: null
  },
  hide_from_home: Boolean,
  device_name: String,
  embed_token: String,
  segment_leaderboard_opt_out: Boolean,
  leaderboard_opt_out: Boolean,
  athlete: {
    id: Number,
    resource_state: Number
  },
  map: {
    id: String,
    polyline: String,
    resource_state: Number,
    summary_polyline: String
  },
  splits_metric: [Split.schema],
  segment_efforts: [SegmentEffort.schema],
  gear: Gear.schema,
  photos: {
    type: Photo.schema
  },
  highlighted_kudosers: [HighlightedKudo.schema]
});

const Activity = mongoose.model('activities', ActivitySchema);

module.exports = Activity;
