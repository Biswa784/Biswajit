import React, { useState, useRef, useEffect, useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaDownload,
  FaCode,
  FaServer,
  FaDatabase,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaSpinner,
  FaTrophy,
  FaCertificate,
  FaStar,
  FaCodeBranch,
  FaExternalLinkAlt,
  FaEye
} from "react-icons/fa";
import TerminalSidebar from "../components/TerminalSidebar";
import "./Home.css";

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [isPlayingCert, setIsPlayingCert] = useState(true);
  const [isPlayingAchieve, setIsPlayingAchieve] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);
  const [repoStats, setRepoStats] = useState({});
  const certSliderRef = useRef(null);
  const achieveSliderRef = useRef(null);
  const certAnimationRef = useRef(null);
  const achieveAnimationRef = useRef(null);

  // Projects Data with Images
  const projects = useMemo(() => [
    {
      id: 1,
      title: "NutriSathi",
      repo: "Biswa784/NutriSathi",
      description: "AI-powered nutrition assistant that helps users track their daily nutrition intake, get personalized meal recommendations, and achieve health goals.",
      fullDescription: "NutriSathi is a comprehensive nutrition tracking platform that uses machine learning to analyze user eating habits and provide personalized recommendations. Features include calorie tracking, nutrient analysis, meal planning, and progress visualization.",
      techStack: ["React", "Node.js", "MongoDB", "TensorFlow.js", "Chart.js"],
      imageUrl: "images/Screenshot 2026-05-29 103204.png",
      fallbackImage: "https://via.placeholder.com/400x200/0d1117/00ff00?text=NutriSathi",
      color: "#00ff00",
      features: ["Calorie Tracking", "AI Recommendations", "Meal Planning", "Progress Analytics"]
    },
    {
      id: 2,
      title: "Hotel-Revenue-Analysis",
      repo: "Biswa784/Hotel-Revenue-Analysis",
      description: "Data analytics dashboard for hotel revenue optimization with interactive visualizations and predictive modeling.",
      fullDescription: "A comprehensive business intelligence tool that analyzes hotel booking data, revenue patterns, and customer behavior to optimize pricing strategies and maximize revenue.",
      techStack: ["Python", "Pandas", "Plotly", "Power BI", "SQL"],
      imageUrl: "images/Screenshot 2026-05-29 104441.png",
      fallbackImage: "https://via.placeholder.com/400x200/0d1117/00ccff?text=Hotel+Revenue+Analysis",
      color: "#00ccff",
      features: ["Revenue Analytics", "Booking Trends", "Price Optimization", "Customer Insights"]
    },
    {
      id: 3,
      title: "HealthSphere",
      repo: "Biswa784/HealthSphere",
      description: "Healthcare management system integrating telemedicine, appointment scheduling, and patient record management.",
      fullDescription: "A complete healthcare platform that connects doctors and patients through video consultations, manages medical records securely, and automates appointment scheduling with reminders.",
      techStack: ["MERN", "Socket.io", "WebRTC", "JWT", "TailwindCSS"],
      imageUrl: "images/Screenshot 2026-05-29 102809.png",
      fallbackImage: "https://via.placeholder.com/400x200/0d1117/ff6600?text=HealthSphere",
      color: "#ff6600",
      features: ["Telemedicine", "Appointment System", "Medical Records", "Prescription Management"]
    },
    {
      id: 4,
      title: "churn-analysis-bi",
      repo: "Biswa784/churn-analysis-bi",
      description: "Customer churn prediction using machine learning with interactive business intelligence dashboards.",
      fullDescription: "Advanced ML model that predicts customer churn probability based on behavioral patterns, transaction history, and engagement metrics. Includes BI dashboards for stakeholders.",
      techStack: ["Python", "Scikit-learn", "Tableau", "SQL", "Flask"],
      imageUrl: "images/Screenshot 2026-05-29 104558.png",
      fallbackImage: "https://via.placeholder.com/400x200/0d1117/ff00ff?text=Churn+Analysis",
      color: "#ff00ff",
      features: ["Churn Prediction", "Customer Segmentation", "Retention Strategies", "BI Dashboards"]
    },
    {
      id: 5,
      title: "Data_visualizes",
      repo: "Biswa784/Data_visualizes",
      description: "Interactive data visualization library with multiple chart types and real-time data updates.",
      fullDescription: "A comprehensive data visualization tool that supports multiple chart types including bar charts, line graphs, scatter plots, heatmaps, and geographical maps with real-time data streaming.",
      techStack: ["D3.js", "React", "WebSocket", "Redux", "Express"],
      imageUrl: "images/Screenshot 2026-05-29 104441.png",
      fallbackImage: "https://via.placeholder.com/400x200/0d1117/00ffcc?text=Data+Visualizes",
      color: "#00ffcc",
      features: ["Multiple Chart Types", "Real-time Updates", "Export Options", "Interactive Filters"]
    },
    {
      id: 6,
      title: "cricket-analysis-dashboard",
      repo: "Biswa784/cricket-analysis-dashboard",
      description: "Comprehensive cricket analytics platform for match prediction and player performance analysis.",
      fullDescription: "A sports analytics platform that processes historical cricket data to predict match outcomes, analyze player performance, and provide strategic insights for teams.",
      techStack: ["Python", "Flask", "React", "MongoDB", "Machine Learning"],
      imageUrl: "images/Screenshot 2026-05-29 104344.png",
      fallbackImage: "https://via.placeholder.com/400x200/0d1117/ffcc00?text=Cricket+Analysis",
      color: "#ffcc00",
      features: ["Match Prediction", "Player Stats", "Team Analysis", "Historical Data"]
    }
  ], []);

  // Certification images data
  const certifications = [
    {
      id: 1,
      src: "cirtificate/Data Analytics with Python_page-0001.jpg",
      alt: "Full Stack Certification",
      title: "Full Stack Development",
      issuer: "Coursera",
      date: "2024",
      credential: "FULL-STACK-2024"
    },
    {
      id: 2,
      src: "cirtificate/DT Internship Completion - BISWAJIT PANDA_page-0001.jpg",
      alt: "React Certification",
      title: "React Advanced",
      issuer: "Meta",
      date: "2024",
      credential: "REACT-META-2024"
    },
    {
      id: 3,
      src: "cirtificate/sql_intermediate certificate_page-0001.jpg",
      alt: "MongoDB Certification",
      title: "MongoDB Developer",
      issuer: "MongoDB University",
      date: "2023",
      credential: "MDB-2023-001"
    },
    {
      id: 4,
      src: "cirtificate/TATA IQ_page-0001.jpg",
      alt: "MongoDB Certification",
      title: "MongoDB Developer",
      issuer: "MongoDB University",
      date: "2023",
      credential: "MDB-2023-001"
    },
    {
      id: 5,
      src: "client/public/cirtificate/WhatsApp Image 2026-05-29 at 12.42.03 PM.jpeg",
      alt: "MongoDB Certification",
      title: "MongoDB Developer",
      issuer: "MongoDB University",
      date: "2023",
      credential: "MDB-2023-001"
    }
  ];

  // Achievement images data
  const achievements = [
    {
      id: 1,
      src: "/images/achive1.jpeg",
      alt: "Hackathon Winner",
      title: "Hackathon Winner 2024",
      description: "First Place - National Level",
      date: "2024",
      award: "🏆 Gold Medal"
    },
    {
      id: 2,
      src: "/images/achive2.jpeg",
      alt: "Best Developer Award",
      title: "Best Developer Award",
      description: "Outstanding Performance",
      date: "2023",
      award: "⭐ Excellence Award"
    },
    {
      id: 3,
      src: "/images/achive3.jpeg",
      alt: "Open Source Contributor",
      title: "Top Contributor",
      description: "GitHub Open Source",
      date: "2024",
      award: "🚀 Rising Star"
    }
  ];

  // Fetch GitHub repo stats
  useEffect(() => {
    const fetchRepoStats = async () => {
      for (const project of projects) {
        try {
          const response = await fetch(`https://api.github.com/repos/${project.repo}`);
          if (response.ok) {
            const data = await response.json();
            setRepoStats(prev => ({
              ...prev,
              [project.id]: {
                stars: data.stargazers_count || 0,
                forks: data.forks_count || 0,
                issues: data.open_issues_count || 0
              }
            }));
          }
        } catch (error) {
          console.error(`Error fetching stats for ${project.repo}:`, error);
        }
      }
    };
    fetchRepoStats();
  }, [projects]);

  // Duplicate for seamless infinite scroll
  const allCertifications = [...certifications, ...certifications, ...certifications];
  const allAchievements = [...achievements, ...achievements, ...achievements];

  const handleImageLoad = (id, type) => {
    setLoadedImages(prev => ({ ...prev, [`${type}-${id}`]: true }));
  };

  // Certification scroll animation
  useEffect(() => {
    if (isPlayingCert && certSliderRef.current) {
      const scroll = () => {
        if (certSliderRef.current && isPlayingCert) {
          if (certSliderRef.current.scrollLeft >= certSliderRef.current.scrollWidth / 3) {
            certSliderRef.current.scrollLeft = 0;
          } else {
            certSliderRef.current.scrollLeft += 1.5;
          }
        }
      };
      certAnimationRef.current = setInterval(scroll, 30);
    }
    return () => {
      if (certAnimationRef.current) clearInterval(certAnimationRef.current);
    };
  }, [isPlayingCert]);

  // Achievement scroll animation
  useEffect(() => {
    if (isPlayingAchieve && achieveSliderRef.current) {
      const scroll = () => {
        if (achieveSliderRef.current && isPlayingAchieve) {
          if (achieveSliderRef.current.scrollLeft >= achieveSliderRef.current.scrollWidth / 3) {
            achieveSliderRef.current.scrollLeft = 0;
          } else {
            achieveSliderRef.current.scrollLeft += 1.5;
          }
        }
      };
      achieveAnimationRef.current = setInterval(scroll, 30);
    }
    return () => {
      if (achieveAnimationRef.current) clearInterval(achieveAnimationRef.current);
    };
  }, [isPlayingAchieve]);

  const handleScrollLeft = (type) => {
    if (type === 'cert') {
      setIsPlayingCert(false);
      if (certSliderRef.current) certSliderRef.current.scrollBy({ left: -350, behavior: 'smooth' });
      setTimeout(() => setIsPlayingCert(true), 1000);
    } else {
      setIsPlayingAchieve(false);
      if (achieveSliderRef.current) achieveSliderRef.current.scrollBy({ left: -350, behavior: 'smooth' });
      setTimeout(() => setIsPlayingAchieve(true), 1000);
    }
  };

  const handleScrollRight = (type) => {
    if (type === 'cert') {
      setIsPlayingCert(false);
      if (certSliderRef.current) certSliderRef.current.scrollBy({ left: 350, behavior: 'smooth' });
      setTimeout(() => setIsPlayingCert(true), 1000);
    } else {
      setIsPlayingAchieve(false);
      if (achieveSliderRef.current) achieveSliderRef.current.scrollBy({ left: 350, behavior: 'smooth' });
      setTimeout(() => setIsPlayingAchieve(true), 1000);
    }
  };

  const togglePlayPause = (type) => {
    if (type === 'cert') setIsPlayingCert(!isPlayingCert);
    else setIsPlayingAchieve(!isPlayingAchieve);
  };

  const handleImageClick = (image, type) => {
    setSelectedImage(image);
    setSelectedType(type);
    setIsPlayingCert(false);
    setIsPlayingAchieve(false);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedType(null);
    setIsPlayingCert(true);
    setIsPlayingAchieve(true);
  };

  return (
    <motion.div
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="terminal-container">

        {/* HEADER */}
        <motion.div
          className="hero-section"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="ascii-art">
            {`
╔══════════════════════════════════════════════╗
║          BISWAJIT PANDA TERMINAL            ║
║         FULL STACK MERN DEVELOPER           ║
╚══════════════════════════════════════════════╝
`}
          </div>
          <h1 className="main-title">Hi, I'm <span>Biswajit Panda</span></h1>
          <p className="subtitle">Software Engineer | MERN Stack Developer | AI Enthusiast</p>
        </motion.div>

        {/* SYSTEM INFO */}
        <motion.div className="system-info" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="info-card"><span>[ROLE]</span><p>Full Stack Developer</p></div>
          <div className="info-card"><span>[EXPERIENCE]</span><p>Fresher / 0-1 Year</p></div>
          <div className="info-card"><span>[LOCATION]</span><p>Odisha, India</p></div>
          <div className="info-card"><span>[STATUS]</span><p>Open to Work</p></div>
        </motion.div>

         {/* TERMINAL */}
        <motion.div
          className="terminal-box"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="terminal-header">
            <div className="dots">
              <span className="red"></span>
              <span className="yellow"></span>
              <span className="green"></span>
            </div>
            <p>portfolio-terminal</p>
          </div>

          <div className="terminal-body">
            <p>
              <span className="path">C:\Users\Biswajit&gt;</span>{" "}
              whoami
            </p>

            <div className="terminal-output">
              <p>
                &gt; Full Stack MERN Developer passionate about building
                scalable applications
              </p>

              <p>
                &gt; Specialized in React.js, Node.js, MongoDB &
                Express.js
              </p>

              <p>
                &gt; Interested in AI Integration, Data Analytics &
                Cloud Technologies
              </p>

              <p>
                &gt; Building modern responsive and user-friendly
                applications
              </p>
            </div>
          </div>
        </motion.div>

        {/* SKILLS */}
        <motion.div
          className="skills-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="section-title">TECH STACK</h2>

          <div className="skills-grid">
            <div className="skill-card">
              <FaCode className="skill-icon" />
              <h3>Frontend</h3>
              <p>React.js, Redux, Tailwind CSS, JavaScript</p>
            </div>

            <div className="skill-card">
              <FaServer className="skill-icon" />
              <h3>Backend</h3>
              <p>Node.js, Express.js, REST APIs</p>
            </div>

            <div className="skill-card">
              <FaDatabase className="skill-icon" />
              <h3>Database</h3>
              <p>MongoDB, MySQL</p>
            </div>
          </div>
        </motion.div>

        {/* QUICK COMMANDS */}
        <motion.div
          className="quick-commands"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="command-item">[1] View Projects</div>
          <div className="command-item">[2] Experience</div>
          <div className="command-item">[3] Skills</div>
          <div className="command-item">[4] Contact</div>
        </motion.div>

       {/* PROJECTS SECTION */}
<motion.div
  className="projects-section"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.35 }}
>
  <div className="section-header">
    <div className="header-title">
      <FaCode className="section-icon" />
      <h2 className="section-title">PROJECTS</h2>
    </div>
    <div className="project-stats-badge">
      <span className="badge">{projects.length}+ Projects</span>
    </div>
  </div>

  <div className="projects-grid">
    {projects.map((project, index) => (
      <motion.div
        key={project.id}
        className="project-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 + index * 0.1 }}
        whileHover={{ y: -10, scale: 1.02 }}
        onClick={() => setSelectedProject(project)}
      >
        {/* Project Image */}
        <div className="project-image-container">
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="project-image"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400x200/0d1117/00ff00?text=" + encodeURIComponent(project.title);
            }}
          />
          <div className="project-image-overlay">
            <FaExternalLinkAlt className="overlay-icon" />
            <span>Click to view details</span>
          </div>
        </div>
        
        <div className="project-header" style={{ borderColor: project.color }}>
          <h3>{project.title}</h3>
          <div className="project-links">
            <a
              href={`https://github.com/${project.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="github-link"
            >
              <FaGithub />
            </a>
          </div>
        </div>
        <div className="project-content">
          <p className="project-description">{project.description}</p>
          <div className="tech-stack">
            {project.techStack.slice(0, 4).map((tech, i) => (
              <span key={i} className="tech-tag">{tech}</span>
            ))}
          </div>
          <div className="project-stats">
            {repoStats[project.id] && (
              <>
                <span className="stat"><FaStar /> {repoStats[project.id].stars}</span>
                <span className="stat"><FaCodeBranch /> {repoStats[project.id].forks}</span>
                <span className="stat"><FaEye /> {repoStats[project.id].issues}</span>
              </>
            )}
          </div>
          <button className="view-project-btn">
            View Details →
          </button>
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>

        {/* CERTIFICATIONS SECTION */}
        <motion.div
          className="certification-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
        >
          <div className="section-header">
            <div className="header-title">
              <FaCertificate className="section-icon" />
              <h2 className="section-title">CERTIFICATIONS</h2>
            </div>
            <div className="scroll-controls">
              <button onClick={() => handleScrollLeft('cert')} className="scroll-btn"><FaChevronLeft /></button>
              <button onClick={() => togglePlayPause('cert')} className="scroll-btn">{isPlayingCert ? "⏸" : "▶"}</button>
              <button onClick={() => handleScrollRight('cert')} className="scroll-btn"><FaChevronRight /></button>
            </div>
          </div>

          <div className="certification-slider-wrapper">
            <div className="certification-slider" ref={certSliderRef}>
              <div className="certification-track">
                {allCertifications.map((cert, index) => (
                  <motion.div
                    key={`cert-${cert.id}-${index}`}
                    className="certification-card"
                    whileHover={{ scale: 1.05, y: -10 }}
                    onClick={() => handleImageClick(cert, 'cert')}
                  >
                    <div className="certification-image-container">
                      {!loadedImages[`cert-${cert.id}`] && (
                        <div className="image-loader"><FaSpinner className="spinner" /><span>Loading...</span></div>
                      )}
                      <img
                        src={cert.src}
                        alt={cert.alt}
                        className="certification-image"
                        onLoad={() => handleImageLoad(cert.id, 'cert')}
                        style={{ display: loadedImages[`cert-${cert.id}`] ? 'block' : 'none' }}
                      />
                      <div className="image-overlay"><FaExpand className="expand-icon" /><span>View Certificate</span></div>
                    </div>
                    <div className="certification-info">
                      <h4>{cert.title}</h4>
                      <p>{cert.issuer}</p>
                      <span className="cert-date">{cert.date}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="slider-gradient left"></div>
            <div className="slider-gradient right"></div>
          </div>
        </motion.div>

        {/* ACHIEVEMENTS SECTION */}
        <motion.div
          className="achievements-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
        >
          <div className="section-header">
            <div className="header-title">
              <FaTrophy className="section-icon" />
              <h2 className="section-title">ACHIEVEMENTS</h2>
            </div>
            <div className="scroll-controls">
              <button onClick={() => handleScrollLeft('achieve')} className="scroll-btn"><FaChevronLeft /></button>
              <button onClick={() => togglePlayPause('achieve')} className="scroll-btn">{isPlayingAchieve ? "⏸" : "▶"}</button>
              <button onClick={() => handleScrollRight('achieve')} className="scroll-btn"><FaChevronRight /></button>
            </div>
          </div>

          <div className="achievement-slider-wrapper">
            <div className="achievement-slider" ref={achieveSliderRef}>
              <div className="achievement-track">
                {allAchievements.map((achieve, index) => (
                  <motion.div
                    key={`achieve-${achieve.id}-${index}`}
                    className="achievement-card"
                    whileHover={{ scale: 1.05, y: -10 }}
                    onClick={() => handleImageClick(achieve, 'achieve')}
                  >
                    <div className="achievement-image-container">
                      {!loadedImages[`achieve-${achieve.id}`] && (
                        <div className="image-loader"><FaSpinner className="spinner" /><span>Loading...</span></div>
                      )}
                      <img
                        src={achieve.src}
                        alt={achieve.alt}
                        className="achievement-image"
                        onLoad={() => handleImageLoad(achieve.id, 'achieve')}
                        style={{ display: loadedImages[`achieve-${achieve.id}`] ? 'block' : 'none' }}
                      />
                      <div className="image-overlay"><FaExpand className="expand-icon" /><span>View Achievement</span></div>
                    </div>
                    <div className="achievement-info">
                      <div className="award-icon">{achieve.award.split(' ')[0]}</div>
                      <h4>{achieve.title}</h4>
                      <p>{achieve.description}</p>
                      <span className="achievement-date">{achieve.date}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="slider-gradient left"></div>
            <div className="slider-gradient right"></div>
          </div>
        </motion.div>

        {/* BUTTONS */}
          <motion.div className="action-buttons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          <a href="/resume_Biswajit_Panda.pdf" download="resume_Biswajit_Panda.pdf" className="btn primary-btn"><FaDownload /> Download Resume</a>
          <a href="https://github.com/Biswa784" target="_blank" rel="noreferrer" className="btn secondary-btn"><FaGithub /> GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn secondary-btn"><FaLinkedin /> LinkedIn</a>
        </motion.div>

        {/* CONTACT */}
         <motion.div className="contact-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }}>
  <div className="contact-info">
    <FaEnvelope className="mail-icon" />
    <div className="email-options">
      <a
        href="https://mail.google.com/mail/?view=cm&fs=1&to=biswajitpanda871@gmail.com&su=Contact%20from%20Portfolio&body=Hello%20Biswajit,%0A%0AI%20visited%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you.%0A%0A%0A%0ABest%20regards"
        className="contact-email"
        title="Open in Email Client"
      >
        biswajitpanda871@gmail.com
      </a>
      
      
    </div>
  </div>
</motion.div>

        {/* FOOTER STATUS */}
        <div className="system-status">
          <span className="status-led">●</span> SYSTEM ONLINE
          <span className="status-led">●</span> READY FOR COMMANDS
          <span className="status-led">●</span> {projects.length} PROJECTS
          <span className="status-led">●</span> {certifications.length} CERTIFICATIONS
          <span className="status-led">●</span> {achievements.length} ACHIEVEMENTS
        </div>
      </div>

      <TerminalSidebar />

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div className="image-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}>
            <motion.div className="modal-content project-modal" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }} onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedProject(null)}><FaTimes /></button>
              <div className="project-modal-header" style={{ borderColor: selectedProject.color }}>
                <h2>{selectedProject.title}</h2>
                <a href={`https://github.com/${selectedProject.repo}`} target="_blank" rel="noopener noreferrer" className="modal-github-link">
                  <FaGithub /> View on GitHub
                </a>
              </div>
              <div className="project-modal-body">
                <p className="full-description">{selectedProject.fullDescription}</p>
                <div className="tech-stack-full">
                  <h4>Technologies Used:</h4>
                  <div className="tech-list">
                    {selectedProject.techStack.map((tech, i) => (
                      <span key={i} className="tech-tag-large">{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="features-list">
                  <h4>Key Features:</h4>
                  <ul>
                    {selectedProject.features.map((feature, i) => (
                      <li key={i}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>
                {repoStats[selectedProject.id] && (
                  <div className="repo-stats-full">
                    <span><FaStar /> {repoStats[selectedProject.id].stars} Stars</span>
                    <span><FaCodeBranch /> {repoStats[selectedProject.id].forks} Forks</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div className="image-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal}>
            <motion.div className="modal-content" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }} onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}><FaTimes /></button>
              <img src={selectedImage.src} alt={selectedImage.alt} />
              <div className="modal-info">
                <h3>{selectedImage.title}</h3>
                {selectedType === 'cert' ? (
                  <><p>{selectedImage.issuer}</p><span>{selectedImage.date}</span><p className="credential-id">ID: {selectedImage.credential}</p></>
                ) : (
                  <><p>{selectedImage.description}</p><span>{selectedImage.date}</span><p className="award-badge">{selectedImage.award}</p></>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;