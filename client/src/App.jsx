import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import BootScreen from './pages/BootScreen';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Achievements from './pages/Aboutme';
import Navbar from './components/Navbar';
import WindowProvider, { Folder, File } from './components/WindowManager';
import ExperienceLog from './components/ExperienceLog';
import { resetBoot } from './features/boot/bootSlice';
import './App.css';

function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetBoot());
    const hasBooted = sessionStorage.getItem('hasBooted');
    if (hasBooted) {
      setBootComplete(true);
    }
  }, [dispatch]);

  const handleBootComplete = () => {
    setBootComplete(true);
    sessionStorage.setItem('hasBooted', 'true');
  };

  const handleReset = () => {
    sessionStorage.removeItem('hasBooted');
    dispatch(resetBoot());
    setBootComplete(false);
  };

  return (
    <Router>
      <WindowProvider>
        <div className="app">
          {!bootComplete ? (
            <BootScreen onBootComplete={handleBootComplete} />
          ) : (
            <>
              <Navbar />
              <div className="content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/aboutme" element={<Achievements />} />
                  <Route path="/settings" element={
                    <div className="settings">
                      <h2 className="terminal-title">SYSTEM SETTINGS</h2>
                      <button onClick={handleReset} className="reset-button">
                        [REBOOT SYSTEM]
                      </button>
                    </div>
                  } />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
            </>
          )}
        </div>
      </WindowProvider>
    </Router>
  );
}

export default App;