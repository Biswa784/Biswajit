import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).replace(',', '');
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.txt';
    link.download = 'Biswajit_Panda_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="system-icon">
          <span className="icon">⏻</span>
        </div>
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            [HOME]
          </Link>
          <Link 
            to="/projects" 
            className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}
          >
            [PROJECTS]
          </Link>
          <Link 
            to="/play-tetris" 
            className={`nav-link ${location.pathname === '/play-tetris' ? 'active' : ''}`}
          >
            [PLAY_TETRIS]
          </Link>
          <Link 
            to="/settings" 
            className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}
          >
            [SETTINGS]
          </Link>
        </div>
      </div>
      
      <div className="navbar-right">
        <button 
          onClick={handleDownloadResume}
          className="download-resume-btn"
          title="Download Resume"
        >
          <span className="taskbar-icon">📄</span>
          <span className="taskbar-text">RESUME</span>
        </button>
        <a 
          href="mailto:biswajitpanda871@gmail.com" 
          className="taskbar-item contact-link"
          title="Email: biswajitpanda871@gmail.com"
        >
          <span className="taskbar-icon">✉️</span>
          <span className="taskbar-text">MAIL</span>
        </a>
        <div className="taskbar-item">
          <span className="taskbar-icon">🌐</span>
          <span className="taskbar-text">NET: ONLINE</span>
        </div>
        <div className="taskbar-item">
          <span className="taskbar-icon">⚡</span>
          <span className="taskbar-text">CPU: 23%</span>
        </div>
        <div className="taskbar-item time-display">
          <span className="taskbar-icon">📅</span>
          <span className="taskbar-text">{formatTime(currentTime)}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
