const mongoose = require('mongoose');

const snakeScoreSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true,
    default: 'Anonymous'
  },
  score: {
    type: Number,
    required: true
  },
  level: {
    type: Number,
    default: 1
  },
  duration: {
    type: Number, // in seconds
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  },
  ip: String,
  userAgent: String
});

// Index for high score queries
snakeScoreSchema.index({ score: -1 });
snakeScoreSchema.index({ date: -1 });

module.exports = mongoose.model('SnakeScore', snakeScoreSchema);