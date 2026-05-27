import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextMessage, setProgress } from '../features/boot/bootSlice';
import { motion, AnimatePresence } from 'framer-motion';
import './BootScreen.css';

const BootScreen = ({ onBootComplete }) => {
  const dispatch = useDispatch();
  const { bootMessages, currentMessageIndex, bootComplete } = useSelector((state) => state.boot);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const bootRef = useRef(null);

  useEffect(() => {
    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (currentMessageIndex < bootMessages.length) {
      const timer = setTimeout(() => {
        setDisplayedMessages((prev) => [...prev, bootMessages[currentMessageIndex].text]);
        dispatch(setProgress(Math.floor((currentMessageIndex + 1) / bootMessages.length * 100)));
        dispatch(nextMessage());
      }, bootMessages[currentMessageIndex].delay);
      
      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex, bootMessages, dispatch]);

  useEffect(() => {
    if (bootComplete) {
      const timer = setTimeout(() => {
        onBootComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [bootComplete, onBootComplete]);

  return (
    <div className="boot-screen" ref={bootRef}>
      <div className="terminal-window">
        <div className="terminal-header">
          <span className="terminal-title">BIOS v3.14 - Biswajit Systems Inc.</span>
          <div className="terminal-controls">
            <span className="control">-</span>
            <span className="control">□</span>
            <span className="control">×</span>
          </div>
        </div>
        <div className="terminal-content">
          <AnimatePresence>
            {displayedMessages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="terminal-line"
              >
                <span className="prompt">C:\&gt;</span> {message}
              </motion.div>
            ))}
          </AnimatePresence>
          {!bootComplete && (
            <div className="terminal-line current-line">
              <span className="prompt">C:\&gt;</span> LOADING... {Math.floor(currentMessageIndex / bootMessages.length * 100)}%
              <span className={`cursor ${showCursor ? 'visible' : ''}`}>_</span>
            </div>
          )}
          {bootComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="boot-complete"
            >
              <div className="success-message">SYSTEM READY</div>
              <div className="press-any-key">Press any key to continue...</div>
            </motion.div>
          )}
        </div>
        <div className="terminal-footer">
          <span className="footer-text">[Press ESC for setup] [F8 for boot menu]</span>
        </div>
      </div>
    </div>
  );
};

export default BootScreen;