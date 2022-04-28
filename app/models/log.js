const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  athlete_id: {
    type: Number,
    required: true,
    ref: 'athletes'
  },
  type: {
    type: String,
    required: true
  },
  timestamp: {
    type: Number,
    default: Date.now()
  }
});

const Log = mongoose.model('logs', LogSchema);

module.exports = Log;
