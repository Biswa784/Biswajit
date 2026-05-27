import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiTerminal, FiFolder, FiGrid, FiFileText, 
  FiUser, FiCpu, FiAward, FiDownload, FiCode,
  FiMonitor, FiBox, FiClock, FiStar, FiChevronRight,
  FiChevronLeft, FiX, FiMinus, FiSquare
} from 'react-icons/fi';
import { useWindows } from './WindowManager';
import { soundManager } from '../utils/soundManager';
import './TerminalSidebar.css';

const TerminalSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeItem, setActiveItem] = useState('Projects');
  const { dispatch } = useWindows();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
  };

const handleMenuItemClick = (item) => {
  soundManager.play('open');   // ✅ HERE
  setActiveItem(item.name);
  openWindow(item);
};

  const openWindow = (item) => {
    const windowContent = {
      'Terminal': <TerminalWindow />,
      'Files': <FilesWindow />,
      'Projects': <ProjectsWindow />,
      'Logs': <LogsWindow />,
      'About': <AboutWindow />,
      'Skills': <SkillsWindow />,
      'Radar': <RadarWindow />,
      'Awards': <AwardsWindow />,
      'Resume': <ResumeWindow />,
      'Code': <CodeWindow />,
      'Display': <DisplayWindow />,
      'Tetris': <TetrisWindow />
    };

    const windowSizes = {
      'Terminal': { width: 600, height: 500 },
      'Files': { width: 700, height: 550 },
      'Projects': { width: 800, height: 600 },
      'Logs': { width: 600, height: 450 },
      'About': { width: 500, height: 400 },
      'Skills': { width: 700, height: 550 },
      'Radar': { width: 600, height: 500 },
      'Awards': { width: 650, height: 480 },
      'Resume': { width: 750, height: 600 },
      'Code': { width: 800, height: 550 },
      'Display': { width: 500, height: 350 },
      'Tetris': { width: 400, height: 600 }
    };

    if (dispatch) {
      dispatch({
        type: 'OPEN_WINDOW',
        payload: {
          title: item.name,
          content: windowContent[item.name] || <div>Window content for {item.name}</div>,
          icon: item.icon,
          position: { 
            x: Math.random() * 200 + 50, 
            y: Math.random() * 200 + 50 
          },
          size: windowSizes[item.name] || { width: 600, height: 500 },
          data: { category: item.category }
        }
      });
    }
  };

  const menuItems = [
    { icon: <FiTerminal />, name: 'Terminal', category: 'system' },
    { icon: <FiFolder />, name: 'Files', category: 'system' },
    { icon: <FiGrid />, name: 'Projects', category: 'main' },
    { icon: <FiFileText />, name: 'Logs', category: 'system' },
    { icon: <FiUser />, name: 'About', category: 'main' },
    { icon: <FiCpu />, name: 'Skills', category: 'main' },
    { icon: <FiStar />, name: 'Radar', category: 'main' },
    { icon: <FiAward />, name: 'Awards', category: 'main' },
    { icon: <FiDownload />, name: 'Resume', category: 'main' },
    { icon: <FiCode />, name: 'Code', category: 'main' },
    { icon: <FiMonitor />, name: 'Display', category: 'settings' },
    { icon: <FiBox />, name: 'Tetris', category: 'games' },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button 
        className={`sidebar-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <FiChevronRight /> : <FiChevronLeft />}
        <span className="toggle-text">{isOpen ? 'Close' : 'Menu'}</span>
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="terminal-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Window Header */}
            <div className="sidebar-header">
              <div className="window-controls">
                <span className="window-control close"><FiX /></span>
                <span className="window-control minimize"><FiMinus /></span>
                <span className="window-control maximize"><FiSquare /></span>
              </div>
              <div className="window-title">
                <FiTerminal className="title-icon" />
                <span>NAVIGATOR v1.0</span>
              </div>
              <div className="window-time">
                <FiClock className="time-icon" />
                <span>{formatTime(currentTime)}</span>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="sidebar-content">
              {/* System Section */}
              <div className="menu-section">
                <div className="section-title">
                  <span className="section-prompt">C:\System&gt;</span>
                </div>
                {menuItems.filter(item => item.category === 'system').map((item, index) => (
                  <motion.div
                    key={item.name}
                    className={`menu-item ${activeItem === item.name ? 'active' : ''}`}
                    onClick={() => handleMenuItemClick(item)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5, backgroundColor: 'rgba(0, 255, 0, 0.1)' }}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    <span className="menu-name">[{item.name}]</span>
                    <span className="menu-status">●</span>
                  </motion.div>
                ))}
              </div>

              {/* Main Section */}
              <div className="menu-section">
                <div className="section-title">
                  <span className="section-prompt">C:\Main&gt;</span>
                </div>
                <div className="menu-grid">
                  {menuItems.filter(item => item.category === 'main').map((item, index) => (
                    <motion.div
                      key={item.name}
                      className={`grid-item ${activeItem === item.name ? 'active' : ''}`}
                      onClick={() => handleMenuItemClick(item)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.03 }}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 255, 0, 0.2)' }}
                    >
                      <span className="grid-icon">{item.icon}</span>
                      <span className="grid-name">{item.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Settings & Games Section */}
              <div className="menu-section">
                <div className="section-title">
                  <span className="section-prompt">C:\Extras&gt;</span>
                </div>
                <div className="menu-row">
                  {menuItems.filter(item => item.category === 'settings' || item.category === 'games').map((item, index) => (
                    <motion.div
                      key={item.name}
                      className={`row-item ${activeItem === item.name ? 'active' : ''}`}
                      onClick={() => handleMenuItemClick(item)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      whileHover={{ y: -2 }}
                    >
                      <span className="row-icon">{item.icon}</span>
                      <span className="row-name">{item.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* System Stats */}
              <div className="system-stats">
                <div className="stat-item">
                  <span className="stat-label">CPU:</span>
                  <div className="stat-bar">
                    <div className="stat-fill" style={{ width: '23%' }}></div>
                  </div>
                  <span className="stat-value">23%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">MEM:</span>
                  <div className="stat-bar">
                    <div className="stat-fill" style={{ width: '45%' }}></div>
                  </div>
                  <span className="stat-value">45%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">NET:</span>
                  <span className="stat-value online">ONLINE</span>
                </div>
              </div>

              {/* Footer */}
              <div className="sidebar-footer">
                <span className="footer-prompt">C:\Users\Biswajit&gt;</span>
                <span className="footer-command">_</span>
                <span className="footer-cursor"></span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Window Content Components
const TerminalWindow = () => (
  <div style={{ padding: '10px', width: '100%', fontFamily: 'monospace', color: '#0f0', lineHeight: '1.6' }}>
    <div>C:\System\Terminal&gt; Welcome to Terminal v1.0</div>
    <div>&gt; Type 'help' for available commands</div>
    <div>&gt; System ready</div>
    <div>&gt; _</div>
  </div>
);

const FilesWindow = () => (
  <div style={{ padding: '10px', width: '100%', fontFamily: 'monospace', color: '#0f0', lineHeight: '1.8' }}>
    <div>[📁] Documents</div>
    <div>[📁] Projects</div>
    <div>[📁] Downloads</div>
    <div>[📁] Music</div>
    <div>[📄] Resume.pdf</div>
    <div>[📄] Portfolio.html</div>
    <div>[🎵] background.mp3</div>
  </div>
);

const ProjectsWindow = () => (
  <div style={{ padding: '10px', width: '100%', fontFamily: 'monospace', color: '#0f0', lineHeight: '1.8' }}>
    <div style={{ fontWeight: 'bold', marginBottom: '10px', borderBottom: '2px solid #0f0', paddingBottom: '5px' }}>PROJECT PORTFOLIO</div>
    <div>1. PortfolioBoot - React + Node.js Portfolio</div>
    <div style={{ color: '#888', fontSize: '12px' }}>   MERN Stack, Draggable Windows, Sound Integration</div>
    <div style={{ marginTop: '8px' }}>2. AI Chat Application - LangChain Integration</div>
    <div style={{ color: '#888', fontSize: '12px' }}>   OpenAI, Real-time Streaming, Data Processing</div>
    <div style={{ marginTop: '8px' }}>3. E-commerce Platform - MERN Stack</div>
    <div style={{ marginTop: '8px' }}>4. Data Analysis Dashboard</div>
  </div>
);

const LogsWindow = () => (
  <div style={{ padding: '10px', width: '100%', fontFamily: 'monospace', color: '#0f0', lineHeight: '1.6', fontSize: '12px' }}>
    <div>[INFO] 14:32:45 - System started successfully</div>
    <div>[INFO] 14:32:46 - Modules loaded</div>
    <div>[DEBUG] 14:32:47 - Cache initialized</div>
    <div>[INFO] 14:32:48 - Audio system engaged</div>
    <div>[INFO] 14:32:49 - Services running</div>
    <div>[OK] 14:32:50 - Ready for user input</div>
  </div>
);

const AboutWindow = () => (
  <div style={{ padding: '15px', width: '100%', fontFamily: 'monospace', color: '#0f0', lineHeight: '1.8' }}>
    <h3 style={{ color: '#00ff00', marginTop: 0, marginBottom: '10px', borderBottom: '2px solid #0f0', paddingBottom: '5px' }}>BISWAJIT PANDA</h3>
    <div>📝 Software Engineer | Full-Stack Developer</div>
    <div>⏱️ Experience: Fresher (0-1 year)</div>
    <div>🎯 Specialization: MERN Stack, AI Integration</div>
    <div>📍 Location: India</div>
    <div style={{ marginTop: '10px', fontSize: '12px', color: '#888' }}>Building scalable web applications with modern technologies</div>
  </div>
);

const SkillsWindow = () => (
  <div style={{ padding: '10px', width: '100%', fontFamily: 'monospace', color: '#0f0', lineHeight: '1.8' }}>
    <div style={{ fontWeight: 'bold', marginBottom: '8px', borderBottom: '2px solid #0f0', paddingBottom: '5px' }}>TECHNICAL SKILLS</div>
    <div>Frontend: React, Redux, Tailwind CSS, Framer Motion</div>
    <div>Backend: Node.js, Express, MongoDB, Mongoose</div>
    <div>AI/ML: LangChain, OpenAI, Data Analysis</div>
    <div>Tools: Git, VS Code, Docker, Postman</div>
    <div>Audio: Howler.js, Web Audio API</div>
  </div>
);

const RadarWindow = () => (
  <div style={{ padding: '10px', width: '100%', fontFamily: 'monospace', color: '#0f0', lineHeight: '1.8' }}>
    <div style={{ fontWeight: 'bold', marginBottom: '8px', borderBottom: '2px solid #0f0', paddingBottom: '5px' }}>SKILL RADAR</div>
    <div>JavaScript  ████████░░ 80%</div>
    <div>React       ████████░░ 85%</div>
    <div>Node.js     ███████░░░ 70%</div>
    <div>MongoDB     ███████░░░ 75%</div>
    <div>AI/ML       ██████░░░░ 60%</div>
    <div>UI/UX       ███████░░░ 72%</div>
  </div>
);

const AwardsWindow = () => (
  <div style={{ padding: '10px', width: '100%', fontFamily: 'monospace', color: '#0f0', lineHeight: '1.8' }}>
    <div style={{ fontWeight: 'bold', marginBottom: '8px', borderBottom: '2px solid #0f0', paddingBottom: '5px' }}>ACHIEVEMENTS</div>
    <div>🏆 React Proficiency Certification</div>
    <div>🏆 Full-Stack Development Badge</div>
    <div>🏆 AI Integration Specialist</div>
    <div>🏆 Open Source Contributor</div>
  </div>
);

const ResumeWindow = () => (
  <div style={{ padding: '10px', width: '100%', fontFamily: 'monospace', color: '#0f0', lineHeight: '1.8', fontSize: '12px' }}>
    <div style={{ fontWeight: 'bold', marginBottom: '8px', borderBottom: '2px solid #0f0', paddingBottom: '5px' }}>RESUME</div>
    <div>📧 Email: biswajit@email.com</div>
    <div>📱 Phone: +91 XXXXXXXXXX</div>
    <div>💻 GitHub: github.com/biswajit</div>
    <div>🔗 LinkedIn: linkedin.com/in/biswajit</div>
    <div>🌐 Portfolio: biswajitpanda.dev</div>
  </div>
);

const CodeWindow = () => (
  <div style={{ padding: '10px', width: '100%', fontFamily: 'monospace', color: '#0f0', lineHeight: '1.6', fontSize: '12px' }}>
    <div>{`const portfolio = {`}</div>
    <div>&nbsp;&nbsp;name: "Biswajit Panda",</div>
    <div>&nbsp;&nbsp;role: "Software Engineer",</div>
    <div>&nbsp;&nbsp;skills: ["React", "Node", "MongoDB"],</div>
    <div>&nbsp;&nbsp;passion: "Building Amazing Experiences"</div>
    <div>{`}`}</div>
  </div>
);

const DisplayWindow = () => (
  <div style={{ padding: '10px', width: '100%', fontFamily: 'monospace', color: '#0f0', lineHeight: '1.8' }}>
    <div style={{ fontWeight: 'bold', marginBottom: '8px', borderBottom: '2px solid #0f0', paddingBottom: '5px' }}>DISPLAY SETTINGS</div>
    <div>🎨 Theme: Dark Terminal ✓</div>
    <div>📺 Resolution: 1920x1080</div>
    <div>💡 Brightness: 100%</div>
    <div>🔊 Sound: Enabled ✓</div>
    <div>🎵 Volume: 50%</div>
  </div>
);

const TetrisWindow = () => (
  <div style={{ padding: '10px', width: '100%', fontFamily: 'monospace', color: '#0f0', textAlign: 'center', lineHeight: '2' }}>
    <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '15px' }}>TETRIS GAME</div>
    <div style={{ fontSize: '32px', margin: '15px 0' }}>🎮</div>
    <div>Coming Soon...</div>
    <div style={{ fontSize: '12px', color: '#888', marginTop: '15px' }}>Stay tuned for an interactive gaming experience!</div>
  </div>
);

export default TerminalSidebar;