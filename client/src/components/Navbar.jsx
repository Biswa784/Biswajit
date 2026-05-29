import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { soundManager } from '../utils/soundManager';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  // Initialize sound manager on first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      soundManager.init();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
    
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  // Time display
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Play sound function
  const playSound = (soundType) => {
    if (!isSoundEnabled) return;
    soundManager.play(soundType);
  };

  // Handle navigation click
  const handleNavClick = (e, path) => {
    if (path !== location.pathname) {
      playSound('click');
    }
  };

  // Handle hover sound
  const handleMouseEnter = (soundType = 'hover') => {
    playSound(soundType);
  };

  // Handle download resume with special sounds
 const handleDownloadResume = () => {
  playSound('download');

  const link = document.createElement('a');

  link.href = '/resume_Biswajit_Panda.pdf';

  link.download = 'resume_Biswajit_Panda.pdf';

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};

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

  // Toggle sound function
  const toggleSound = () => {
    const newState = soundManager.toggle();
    setIsSoundEnabled(newState);
  };

  return (
    <nav className="navbar game-navbar">
      <div className="navbar-left">
        <div className="system-icon" onMouseEnter={() => handleMouseEnter('hover')}>
          <span className="icon">⏻</span>
        </div>
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, '/')}
            onMouseEnter={() => handleMouseEnter('hover')}
          >
            [HOME]
          </Link>
          <Link 
            to="/projects" 
            className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, '/projects')}
            onMouseEnter={() => handleMouseEnter('hover')}
          >
            [PROJECTS]
          </Link>
          <Link 
            to="/achievements" 
            className={`nav-link ${location.pathname === '/achievements' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, '/achievements')}
            onMouseEnter={() => handleMouseEnter('hover')}
          >
            [ABOUT ME]
          </Link>
          <Link 
            to="/settings" 
            className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, '/settings')}
            onMouseEnter={() => handleMouseEnter('hover')}
          >
            [SETTINGS]
          </Link>
        </div>
      </div>
      
      <div className="navbar-right">
        <button 
          onClick={handleDownloadResume}
          onMouseEnter={() => handleMouseEnter('hover')}
          className="download-resume-btn"
          title="Download Resume"
        >
          <span className="taskbar-icon">📄</span>
          <span className="taskbar-text">RESUME</span>
        </button>
        <a 
          href="https://mail.google.com/mail/?view=cm&fs=1&to=biswajitpanda871@gmail.com&su=Contact%20from%20Portfolio&body=Hello%20Biswajit,%0A%0AI%20visited%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you.%0A%0A%0A%0ABest%20regards"
          className="taskbar-item contact-link"
          title="Email: biswajitpanda871@gmail.com"
          onClick={() => playSound('click')}
          onMouseEnter={() => handleMouseEnter('hover')}
        >
          <span className="taskbar-icon">✉️</span>
          <span className="taskbar-text">MAIL</span>
        </a>
        <div className="taskbar-item" onMouseEnter={() => handleMouseEnter('hover')}>
          <span className="taskbar-icon">🌐</span>
          <span className="taskbar-text">NET: ONLINE</span>
        </div>
        <div className="taskbar-item" onMouseEnter={() => handleMouseEnter('hover')}>
          <span className="taskbar-icon">⚡</span>
          <span className="taskbar-text">CPU: 23%</span>
        </div>
        <div className="taskbar-item time-display" onMouseEnter={() => handleMouseEnter('hover')}>
          <span className="taskbar-icon">📅</span>
          <span className="taskbar-text">{formatTime(currentTime)}</span>
        </div>
        {/* Sound Toggle Button */}
        <button 
          onClick={toggleSound}
          onMouseEnter={() => handleMouseEnter('hover')}
          className="sound-toggle-btn"
          title={isSoundEnabled ? "Mute Sound" : "Unmute Sound"}
        >
          <span className="taskbar-icon">{isSoundEnabled ? "🔊" : "🔈"}</span>
          <span className="taskbar-text">{isSoundEnabled ? "SOUND: ON" : "SOUND: OFF"}</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;