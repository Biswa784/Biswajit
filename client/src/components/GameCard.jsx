import React from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiAward, FiClock, FiUsers } from 'react-icons/fi';
import './GameCard.css';

const GameCard = ({ game, onPlay }) => {
  const getGameIcon = () => {
    switch(game.type) {
      case 'snake':
        return '🐍';
      case 'tictactoe':
        return '⭕';
      default:
        return '🎮';
    }
  };

  return (
    <motion.div 
      className="game-card"
      whileHover={{ scale: 1.05, borderColor: '#00ff00' }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="game-card-header">
        <span className="game-icon">{getGameIcon()}</span>
        <span className="game-type">[{game.type.toUpperCase()}]</span>
      </div>
      
      <h3 className="game-title">{game.title}</h3>
      <p className="game-description">{game.description}</p>
      
      <div className="game-stats">
        <div className="stat">
          <FiAward className="stat-icon" />
          <span>High Score: {game.highScore || 0}</span>
        </div>
        <div className="stat">
          <FiUsers className="stat-icon" />
          <span>Players: {game.players || 0}</span>
        </div>
        <div className="stat">
          <FiClock className="stat-icon" />
          <span>Avg Time: {game.avgTime || '5m'}</span>
        </div>
      </div>

      <div className="game-controls">
        <button 
          className="play-button"
          onClick={() => onPlay(game)}
        >
          <FiPlay className="play-icon" />
          PLAY NOW
        </button>
      </div>

      <div className="game-footer">
        <span className="footer-prompt">C:\Games\{game.type}&gt;</span>
        <span className="footer-status">● ONLINE</span>
      </div>
    </motion.div>
  );
};

export default GameCard;