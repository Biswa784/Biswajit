import React from 'react';
import { motion } from 'framer-motion';
import TerminalSidebar from '../components/TerminalSidebar';
import './Home.css';

const Home = () => {
  return (
    <motion.div 
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="terminal-container">
        <div className="ascii-art">
          {`
    ╔══════════════════════════════════════╗
    ║     BISWAJIT PANDA - SYSTEM v1.0     ║
    ║     SOFTWARE ENGINEER | MERN STACK    ║
    ╚══════════════════════════════════════╝
          `}
        </div>
        
        <div className="system-info">
          <div className="info-line">
            <span className="label">[USER]:</span> Biswajit PANDA
          </div>
          <div className="info-line">
            <span className="label">[ROLE]:</span> Software Engineer
          </div>
          <div className="info-line">
            <span className="label">[EXPERIENCE]:</span>  Fresher/(0-1year)
          </div>
          <div className="info-line">
            <span className="label">[COMPANY]:</span> Loading...
          </div>
          <div className="info-line">
            <span className="label">[STACK]:</span> MERN | Redux | GenAi | Data Analyst
          </div>
        </div>

        <div className="command-prompt">
          <span className="path">C:\Users\Biswajit&gt;</span>
          <span className="command">whoami</span>
        </div>

        <div className="output">
          &gt; Senior Software Engineer specializing in full-stack development
          &gt; Building scalable web applications with React and Node.js
          &gt; AI integration specialist (LangChain, OpenAI)
        </div>

        <div className="quick-commands">
          <div className="command-item">[1] View Projects</div>
          <div className="command-item">[2] Check Experience</div>
          <div className="command-item">[3] Contact Info</div>
          <div className="command-item">[4] Play Tetris</div>
        </div>

        <div className="contact-section">
          <div className="contact-info">
            <span className="label">[EMAIL]:</span> 
            <a href="mailto:biswajitpanda871@gmail.com" className="contact-email">biswajitpanda871@gmail.com</a>
          </div>
        </div>

        <div className="system-status">
          <span className="status-led">●</span> SYSTEM ONLINE
          <span className="status-led">●</span> READY FOR COMMANDS
        </div>
      </div>

      {/* Add the Terminal Sidebar */}
      <TerminalSidebar />
    </motion.div>
  );
};

export default Home;