const mongoose = require('mongoose');

const ticTacToeMatchSchema = new mongoose.Schema({
  player1: {
    type: String,
    default: 'Player X'
  },
  player2: {
    type: String,
    default: 'Player O'
  },
  winner: {
    type: String,
    enum: ['X', 'O', 'draw', null],
    default: null
  },
  moves: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number, // in seconds
    default: 0
  },
  board: [{
    type: String,
    enum: ['X', 'O', null],
    default: null
  }],
  date: {
    type: Date,
    default: Date.now
  },
  ip: String,
  userAgent: String
});

// Index for stats queries
ticTacToeMatchSchema.index({ winner: 1 });
ticTacToeMatchSchema.index({ date: -1 });

module.exports = mongoose.model('TicTacToeMatch', ticTacToeMatchSchema);