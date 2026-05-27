import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiMinus, FiSquare, FiChevronRight, FiChevronDown, FiCpu, FiFolder, FiDatabase, FiCloud, FiCode } from 'react-icons/fi';
import './ExperienceLog.css';

const ExperienceLog = ({ onClose, initialPosition }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState(initialPosition || { x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [expandedSections, setExpandedSections] = useState({
    experience: true,
    techstack: true,
    summary: true
  });

  const handleMouseDown = (e) => {
    if (!isMaximized) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && !isMaximized) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const experiences = [
    {
      period: "AUG 2024 - PRESENT",
      company: "McKinsey & Company",
      role: "SWE II",
      project: "Enterprise Containerization",
      metric: "85% adoption",
      description: "Enterprise Containerization: A New Approach to Modern IT Infrastructure"
    },
    {
      period: "MAY 2022 - AUG 2024",
      company: "Divani Design Labs & McKinsey & Company",
      role: "Senior Software Engineer II",
      project: "AI/ML - Cloud Migration Engine",
      metric: "Legacy-to-cloud infrastructure shift"
    },
    {
      period: "MAY 2019 - APR 2020",
      company: "TC5",
      role: "IT Manager",
      project: "Cloud migration",
      metric: "95% SLA"
    }
  ];

  const techStack = {
    frontend: ["React", "Angular", "Next.js", "HTML/CSS", "TypeScript", "Redux", "SCSS", "Material UI"],
    backend: ["NestJS", "Python", "PostgreSQL", "Firebase", "AWS"],
    ai_ml: ["LangChain", "Ollama", "OpenAI APIs", "RAG", "NLP", "Hugging Face", "Fine-tuning"],
    devops: ["Kubernetes", "Argo", "Jfrog", "CI/CD"]
  };

  return (
    <motion.div 
      className={`experience-log ${isMaximized ? 'maximized' : ''} ${isMinimized ? 'minimized' : ''}`}
      style={{
        position: 'fixed',
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? '100%' : '600px',
        height: isMaximized ? '100%' : 'auto',
        zIndex: 1000
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      {/* Window Header */}
      <div 
        className="log-header"
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div className="window-controls">
          <span className="window-control close" onClick={onClose}><FiX /></span>
          <span className="window-control minimize" onClick={() => setIsMinimized(!isMinimized)}><FiMinus /></span>
          <span className="window-control maximize" onClick={() => setIsMaximized(!isMaximized)}><FiSquare /></span>
        </div>
        <div className="window-title">
          <span className="title-icon">📄</span>
          <span>SYSTEM_LOG6.TXT - Experience Log</span>
        </div>
        <div className="window-path">
          C:\Logs\Experience\
        </div>
      </div>

      {!isMinimized && (
        <div className="log-content">
          {/* ASCII Art Header */}
          <div className="ascii-header">
            <pre>{`
╔══════════════════════════════════════════════════════════╗
║                    SYSTEM_LOG6.TXT                        ║
║                 EXPERIENCE & TECH STACK                    ║
╚══════════════════════════════════════════════════════════╝
            `}</pre>
          </div>

          {/* Summary Section */}
          <div className="log-section">
            <div className="section-header" onClick={() => toggleSection('summary')}>
              {expandedSections.summary ? <FiChevronDown /> : <FiChevronRight />}
              <span className="section-title">// EXECUTIVE SUMMARY</span>
            </div>
            {expandedSections.summary && (
              <div className="section-content summary">
                <div className="summary-text">
                  <span className="prompt">{`$>`}</span>
                  <span className="text">5 years of full-stack development and AI-enabled solutions, led enterprise product initiatives at McKinsey.</span>
                </div>
                <div className="summary-highlight">
                  <span className="highlight-label">TOTAL_EXPERIENCE:</span>
                  <span className="highlight-value">5+ YEARS</span>
                  <span className="highlight-label">CURRENT_ROLE:</span>
                  <span className="highlight-value">SWE II @ MCKINSEY</span>
                </div>
              </div>
            )}
          </div>

          {/* Experience Timeline */}
          <div className="log-section">
            <div className="section-header" onClick={() => toggleSection('experience')}>
              {expandedSections.experience ? <FiChevronDown /> : <FiChevronRight />}
              <span className="section-title">// EXPERIENCE_LOGO</span>
            </div>
            {expandedSections.experience && (
              <div className="section-content timeline">
                {experiences.map((exp, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker">
                      <span className="marker-dot">●</span>
                      {index < experiences.length - 1 && <span className="marker-line"></span>}
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-period">{exp.period}</div>
                      <div className="timeline-company">{exp.company}</div>
                      <div className="timeline-role">{exp.role}</div>
                      <div className="timeline-project">
                        <span className="project-arrow">▶</span>
                        {exp.project}
                      </div>
                      <div className="timeline-metric">
                        <span className="metric-badge">{exp.metric}</span>
                      </div>
                      {exp.description && (
                        <div className="timeline-description">
                          <span className="description-prompt">{`$>`}</span>
                          {exp.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tech Stack */}
          <div className="log-section">
            <div className="section-header" onClick={() => toggleSection('techstack')}>
              {expandedSections.techstack ? <FiChevronDown /> : <FiChevronRight />}
              <span className="section-title">// TECHLSTACK.CFG</span>
            </div>
            {expandedSections.techstack && (
              <div className="section-content techstack">
                <div className="techstack-header">
                  <span className="header-prompt">LOADED_MODULES</span>
                </div>
                
                <div className="tech-category">
                  <div className="category-title">
                    <FiCode className="category-icon" />
                    <span>[Frontend]</span>
                  </div>
                  <div className="tech-tags">
                    {techStack.frontend.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="tech-category">
                  <div className="category-title">
                    <FiDatabase className="category-icon" />
                    <span>[Backend]</span>
                  </div>
                  <div className="tech-tags">
                    {techStack.backend.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="tech-category">
                  <div className="category-title">
                    <FiCpu className="category-icon" />
                    <span>[AI/ML]</span>
                  </div>
                  <div className="tech-tags">
                    {techStack.ai_ml.map((tech, i) => (
                      <span key={i} className="tech-tag highlight">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="tech-category">
                  <div className="category-title">
                    <FiCloud className="category-icon" />
                    <span>[DevOps]</span>
                  </div>
                  <div className="tech-tags">
                    {techStack.devops.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="log-footer">
            <span className="footer-prompt">C:\Logs\Experience&gt;</span>
            <span className="footer-command">type SYSTEM_LOG6.TXT</span>
            <span className="footer-cursor">_</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ExperienceLog;