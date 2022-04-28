const mongoose = require('mongoose');

const HighlightedKudoSchema = new mongoose.Schema({
  destination_url: String,
  display_name: String,
  avatar_url: String,
  show_name: Boolean,
});

module.exports = mongoose.model('highlighted_kudos', HighlightedKudoSchema);
