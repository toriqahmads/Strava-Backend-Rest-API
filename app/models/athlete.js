const mongoose = require('mongoose');

const AthleteSchema = new mongoose.Schema({
  athlete_id: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: false,
    default: null
  },
  firstname: {
    type: String,
    required: false,
  },
  lastname: {
    type: String,
    required: false,
  },
  sex: {
    type: String,
    required: false,
    default: null
  },
  premium: {
    type: Boolean,
    default: false,
  },
  profile_picture: {
    type: String,
    required: false
  },
  friends: {
    type: Number,
    default: 0
  },
  followers: {
    type: Number,
    default: 0
  }
});

const Athlete = mongoose.model('athletes', AthleteSchema);

module.exports = Athlete;
