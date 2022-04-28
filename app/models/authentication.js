const mongoose = require('mongoose');

const AuthenticationSchema = new mongoose.Schema({
  athlete_id: {
    type: Number,
    required: true,
    ref: 'athletes'
  },
  jwt_token: String,
  refresh_token: String
});

const Authentication = mongoose.model('authentications', AuthenticationSchema);

module.exports = Authentication;
