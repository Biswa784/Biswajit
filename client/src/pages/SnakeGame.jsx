import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './SnakeGame.css';

const SnakeGame = ({ onScoreUpdate }) => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('menu'); // menu, playing, gameover
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  // Game constants
  const GRID_SIZE = 20;
  const CELL_SIZE = 20;
  const INITIAL_SNAKE = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ];

  // Game state refs
  const snakeRef = useRef(INITIAL_SNAKE);
  const foodRef = useRef({ x: 15, y: 10 });
  const directionRef = useRef('RIGHT');
  const gameLoopRef = useRef(null);
  const [food, setFood] = useState(foodRef.current);

  useEffect(() => {
    fetchHighScore();
    drawGame();
  }, []);

  const fetchHighScore = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/games/snake/highscore`);
      setHighScore(response.data.highScore);
    } catch (error) {
      console.error('Error fetching high score:', error);
    }
  };

  const saveScore = async (player, finalScore) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/games/snake/score`, {
        playerName: player,
        score: finalScore
      });
      if (onScoreUpdate) onScoreUpdate();
      fetchHighScore();
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    foodRef.current = newFood;
    setFood(newFood);
  }, []);

  const resetGame = () => {
    snakeRef.current = [...INITIAL_SNAKE];
    directionRef.current = 'RIGHT';
    generateFood();
    setScore(0);
    setGameState('menu');
  };

  const startGame = () => {
    resetGame();
    setGameState('playing');
  };

  const handleGameOver = async () => {
    setGameState('gameover');
    if (score > highScore) {
      setShowNameInput(true);
    } else if (score > 0) {
      await saveScore('Anonymous', score);
    }
  };

  const submitScore = async () => {
    await saveScore(playerName || 'Anonymous', score);
    setShowNameInput(false);
  };

  const moveSnake = useCallback(() => {
    if (gameState !== 'playing') return;

    const snake = snakeRef.current;
    const head = { ...snake[0] };

    switch (directionRef.current) {
      case 'RIGHT': head.x += 1; break;
      case 'LEFT': head.x -= 1; break;
      case 'UP': head.y -= 1; break;
      case 'DOWN': head.y += 1; break;
      default: break;
    }

    // Check wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      handleGameOver();
      return;
    }

    // Check self collision
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      handleGameOver();
      return;
    }

    const newSnake = [head, ...snake];
    
    // Check food collision
    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      setScore(prev => prev + 10);
      generateFood();
    } else {
      newSnake.pop();
    }

    snakeRef.current = newSnake;
    drawGame();
  }, [gameState, generateFood]);

  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = setInterval(moveSnake, 150);
    }
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState, moveSnake]);

  const handleKeyPress = useCallback((e) => {
    if (gameState !== 'playing') return;

    const key = e.key.replace('Arrow', '').toUpperCase();
    const opposite = {
      'UP': 'DOWN',
      'DOWN': 'UP',
      'LEFT': 'RIGHT',
      'RIGHT': 'LEFT'
    };

    if (['UP', 'DOWN', 'LEFT', 'RIGHT'].includes(key) &&
        directionRef.current !== opposite[key]) {
      directionRef.current = key;
    }
  }, [gameState]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const drawGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE);

    // Draw grid
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.2;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw snake
    ctx.globalAlpha = 1;
    snakeRef.current.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#00ff00' : '#00aa00';
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
    });

    // Draw food
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(
      foodRef.current.x * CELL_SIZE + CELL_SIZE / 2,
      foodRef.current.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  };

  useEffect(() => {
    drawGame();
  }, [food]);

  return (
    <motion.div 
      className="snake-game"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="game-header">
        <h2>SNAKE.EXE v1.0</h2>
        <div className="score-board">
          <span>Score: {score}</span>
          <span>High: {highScore}</span>
        </div>
      </div>

      <div className="game-canvas-container">
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          className="game-canvas"
        />
        
        {gameState === 'menu' && (
          <div className="game-overlay">
            <button className="game-button" onClick={startGame}>
              START GAME
            </button>
            <div className="instructions">
              <p>Use arrow keys to move</p>
              <p>Eat red food to grow</p>
            </div>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="game-overlay">
            <h3>GAME OVER</h3>
            <p>Final Score: {score}</p>
            
            {showNameInput ? (
              <div className="name-input">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="game-input"
                />
                <button className="game-button" onClick={submitScore}>
                  SAVE SCORE
                </button>
              </div>
            ) : (
              <button className="game-button" onClick={startGame}>
                PLAY AGAIN
              </button>
            )}
          </div>
        )}
      </div>

      <div className="game-footer">
        <span className="prompt">C:\Games\Snake&gt;</span>
        <span className="status">● RUNNING</span>
      </div>
    </motion.div>
  );
};

export default SnakeGame;