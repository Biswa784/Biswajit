import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWindows } from '../components/WindowManager';
import GameCard from '../components/GameCard';
import SnakeGame from './SnakeGame';
import TicTacToe from './TicTacToe';
import axios from 'axios';
import './Games.css';

const Games = () => {
  const { dispatch } = useWindows();
  const [games, setGames] = useState([
    {
      id: 'snake',
      type: 'snake',
      title: 'SNAKE.EXE',
      description: 'Classic snake game. Eat food, grow longer, don\'t hit walls!',
      highScore: 0,
      players: 0,
      avgTime: '3m'
    },
    {
      id: 'tictactoe',
      type: 'tictactoe',
      title: 'TIC-TAC-TOE.EXE',
      description: 'Two-player mode. Challenge your friend or play with AI.',
      highScore: 0,
      players: 0,
      avgTime: '2m'
    }
  ]);

  useEffect(() => {
    fetchGameStats();
  }, []);

  const fetchGameStats = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/games/stats`);
      setGames(prev => prev.map(game => ({
        ...game,
        highScore: response.data[game.type]?.highScore || 0,
        players: response.data[game.type]?.players || 0
      })));
    } catch (error) {
      console.error('Error fetching game stats:', error);
    }
  };

  const handlePlayGame = (game) => {
    let gameContent;
    
    switch(game.type) {
      case 'snake':
        gameContent = <SnakeGame onScoreUpdate={fetchGameStats} />;
        break;
      case 'tictactoe':
        gameContent = <TicTacToe onMatchComplete={fetchGameStats} />;
        break;
      default:
        return;
    }

    dispatch({
      type: 'OPEN_WINDOW',
      payload: {
        title: game.title,
        icon: game.type === 'snake' ? '🐍' : '⭕',
        content: gameContent,
        size: { width: 600, height: 500 },
        position: {
          x: Math.random() * 200 + 100,
          y: Math.random() * 100 + 50
        }
      }
    });
  };

  return (
    <motion.div 
      className="games-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="games-header">
        <h1 className="terminal-title">
          <span className="prompt">C:\Games&gt;</span> GAME CENTER
        </h1>
        <p className="games-subtitle">Select a game to play in a new window</p>
      </div>

      <div className="games-grid">
        {games.map(game => (
          <GameCard 
            key={game.id}
            game={game}
            onPlay={handlePlayGame}
          />
        ))}
      </div>

      <div className="games-footer">
        <div className="system-stats">
          <span className="stat">🕹️ Active Games: {games.length}</span>
          <span className="stat">👥 Online Players: 24</span>
          <span className="stat">🏆 Tournaments: 3</span>
        </div>
        <div className="footer-command">
          <span className="prompt">C:\Games&gt;</span>
          <span className="command">dir *.exe</span>
          <span className="cursor">_</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Games;