import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './TicTacToe.css';

const TicTacToe = ({ onMatchComplete }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameMode, setGameMode] = useState('menu'); // menu, playing, vsAI, vsPlayer
  const [player1, setPlayer1] = useState('Player X');
  const [player2, setPlayer2] = useState('Player O');
  const [stats, setStats] = useState({ xWins: 0, oWins: 0, draws: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/games/tictactoe/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const saveMatch = async (result) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/games/tictactoe/match`, {
        winner: result,
        player1: player1,
        player2: player2,
        moves: board.filter(cell => cell !== null).length
      });
      if (onMatchComplete) onMatchComplete();
      fetchStats();
    } catch (error) {
      console.error('Error saving match:', error);
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (winner || board[index] || gameMode === 'menu') return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      saveMatch(newWinner);
    } else if (!newBoard.includes(null)) {
      setWinner('draw');
      saveMatch('draw');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const startVsPlayer = () => {
    setGameMode('vsPlayer');
    resetGame();
  };

  const startVsAI = () => {
    setGameMode('vsAI');
    resetGame();
  };

  // AI move (simple random for now)
  useEffect(() => {
    if (gameMode === 'vsAI' && !isXNext && !winner) {
      const emptySquares = board.reduce((acc, cell, index) => {
        if (!cell) acc.push(index);
        return acc;
      }, []);

      if (emptySquares.length > 0) {
        const randomMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        setTimeout(() => handleClick(randomMove), 500);
      }
    }
  }, [isXNext, gameMode, winner]);

  const renderSquare = (index) => (
    <button 
      className={`square ${board[index]?.toLowerCase()}`}
      onClick={() => handleClick(index)}
      disabled={!!winner || gameMode === 'menu'}
    >
      {board[index]}
    </button>
  );

  const getStatus = () => {
    if (winner === 'X') return `Winner: X (${player1})`;
    if (winner === 'O') return `Winner: O (${player2})`;
    if (winner === 'draw') return "Game ended in draw!";
    return `Next player: ${isXNext ? `X (${player1})` : `O (${player2})`}`;
  };

  if (gameMode === 'menu') {
    return (
      <motion.div 
        className="tictactoe-menu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2>TIC-TAC-TOE.EXE</h2>
        <div className="menu-buttons">
          <button className="game-button" onClick={startVsPlayer}>
            VS PLAYER
          </button>
          <button className="game-button" onClick={startVsAI}>
            VS AI
          </button>
        </div>
        <div className="stats-display">
          <h3>STATISTICS</h3>
          <div className="stats-row">
            <span>X Wins: {stats.xWins}</span>
            <span>O Wins: {stats.oWins}</span>
            <span>Draws: {stats.draws}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="tictactoe-game"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="game-info">
        <div className="game-status">{getStatus()}</div>
        <button className="reset-button" onClick={resetGame}>
          NEW GAME
        </button>
        <button className="menu-button" onClick={() => setGameMode('menu')}>
          MAIN MENU
        </button>
      </div>

      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>

      <div className="game-footer">
        <span className="prompt">C:\Games\TicTacToe&gt;</span>
        <span className="mode">Mode: {gameMode === 'vsAI' ? 'VS AI' : 'VS Player'}</span>
      </div>
    </motion.div>
  );
};

export default TicTacToe;