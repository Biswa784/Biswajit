const express = require('express');
const router = express.Router();
const SnakeScore = require('../models/SnakeScore');
const TicTacToeMatch = require('../models/TicTacToeMatch');

// ============ SNAKE GAME ROUTES ============

// Save snake score
router.post('/snake/score', async (req, res) => {
  try {
    const { playerName, score, level, duration } = req.body;
    
    const newScore = new SnakeScore({
      playerName: playerName || 'Anonymous',
      score: score || 0,
      level: level || 1,
      duration: duration || 0,
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });

    await newScore.save();
    
    res.status(201).json({ 
      message: 'Score saved successfully',
      score: newScore 
    });
  } catch (error) {
    console.error('Error saving snake score:', error);
    res.status(500).json({ error: 'Failed to save score' });
  }
});

// Get snake high scores
router.get('/snake/highscores', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const scores = await SnakeScore.find()
      .sort({ score: -1 })
      .limit(limit)
      .select('playerName score level date');
    
    res.json(scores);
  } catch (error) {
    console.error('Error fetching snake scores:', error);
    res.status(500).json({ error: 'Failed to fetch scores' });
  }
});

// Get snake high score
router.get('/snake/highscore', async (req, res) => {
  try {
    const highScore = await SnakeScore.findOne()
      .sort({ score: -1 })
      .select('score');
    
    res.json({ highScore: highScore?.score || 0 });
  } catch (error) {
    console.error('Error fetching snake high score:', error);
    res.status(500).json({ error: 'Failed to fetch high score' });
  }
});

// ============ TIC TAC TOE ROUTES ============

// Save tic tac toe match
router.post('/tictactoe/match', async (req, res) => {
  try {
    const { winner, player1, player2, moves, duration, board } = req.body;
    
    const newMatch = new TicTacToeMatch({
      player1: player1 || 'Player X',
      player2: player2 || 'Player O',
      winner: winner || null,
      moves: moves || 0,
      duration: duration || 0,
      board: board || Array(9).fill(null),
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });

    await newMatch.save();
    
    res.status(201).json({ 
      message: 'Match saved successfully',
      match: newMatch 
    });
  } catch (error) {
    console.error('Error saving tic tac toe match:', error);
    res.status(500).json({ error: 'Failed to save match' });
  }
});

// Get tic tac toe statistics
router.get('/tictactoe/stats', async (req, res) => {
  try {
    const stats = await TicTacToeMatch.aggregate([
      {
        $group: {
          _id: null,
          totalMatches: { $sum: 1 },
          xWins: {
            $sum: { $cond: [{ $eq: ['$winner', 'X'] }, 1, 0] }
          },
          oWins: {
            $sum: { $cond: [{ $eq: ['$winner', 'O'] }, 1, 0] }
          },
          draws: {
            $sum: { $cond: [{ $eq: ['$winner', 'draw'] }, 1, 0] }
          },
          avgMoves: { $avg: '$moves' }
        }
      }
    ]);

    const result = stats[0] || {
      totalMatches: 0,
      xWins: 0,
      oWins: 0,
      draws: 0,
      avgMoves: 0
    };

    res.json({
      xWins: result.xWins,
      oWins: result.oWins,
      draws: result.draws,
      totalMatches: result.totalMatches,
      avgMoves: Math.round(result.avgMoves)
    });
  } catch (error) {
    console.error('Error fetching tic tac toe stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Get recent matches
router.get('/tictactoe/recent', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    
    const matches = await TicTacToeMatch.find()
      .sort({ date: -1 })
      .limit(limit)
      .select('player1 player2 winner moves date');
    
    res.json(matches);
  } catch (error) {
    console.error('Error fetching recent matches:', error);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

// ============ GENERAL GAME ROUTES ============

// Get all games statistics
router.get('/stats', async (req, res) => {
  try {
    // Snake stats
    const snakeHighScore = await SnakeScore.findOne()
      .sort({ score: -1 })
      .select('score');
    
    const snakeTotalPlayers = await SnakeScore.countDocuments();
    
    // Tic Tac Toe stats
    const tttStats = await TicTacToeMatch.aggregate([
      {
        $group: {
          _id: null,
          totalMatches: { $sum: 1 },
          totalPlayers: { $addToSet: '$player1' }
        }
      }
    ]);

    res.json({
      snake: {
        highScore: snakeHighScore?.score || 0,
        players: snakeTotalPlayers
      },
      tictactoe: {
        totalMatches: tttStats[0]?.totalMatches || 0,
        players: tttStats[0]?.totalPlayers?.length || 0
      }
    });
  } catch (error) {
    console.error('Error fetching game stats:', error);
    res.status(500).json({ error: 'Failed to fetch game stats' });
  }
});

module.exports = router;