const mongoose = require('mongoose');

const GearSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  primary: Boolean,
  name: String,
  resource_state: Number,
  distance: Number
});

module.exports = mongoose.model('gears', GearSchema);
