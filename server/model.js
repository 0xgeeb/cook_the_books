const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  home: {
    name: String,
    book: String,
    line: Number,
    id: String
  },
  away: {
    name: String,
    book: String,
    line: Number,
    id: String
  },
  arb: Boolean,
  spread: Boolean
});

module.exports = mongoose.model('Game', GameSchema);