import React, { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import "./Aboutme.css";

const AboutMe = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const timelineStages = [
    {
      id: 1,
      era: "BIRTH",
      year: "2005",
      title: "Welcome to the World",
      subtitle: "The Beginning",
      description: "Born with a curious mind and a passion for learning. Started my journey on planet Earth.",
      icon: "👶",
      color: "#ff6b6b",
      details: ["Born in Odisha, India", "First cry heard", "Journey begins"]
    },
    {
      id: 2,
      era: "EARLY EDUCATION",
      year: "2008",
      title: "Kindergarten",
      subtitle: "First Steps in Learning",
      description: "Started my formal education journey. Made first friends, learned alphabets and numbers.",
      icon: "📚",
      color: "#ffaa00",
      details: ["Started KG 1", "Learned to read & write", "First school memories"]
    },
    {
      id: 3,
      era: "SCHOOL DAYS",
      year: "2010-2020",
      title: "School Career",
      subtitle: "Building Foundation",
      description: "Completed 10 years of schooling with dedication and hard work.",
      icon: "🏫",
      color: "#00ff99",
      details: ["Completed 10th & 12th", "Secured 73% overall", "Active in extracurriculars"],
      isRange: true,
      startYear: "2010",
      endYear: "2020"
    },
    {
      id: 4,
      era: "HIGHER SECONDARY",
      year: "2020-2022",
      title: "Divine H.S. Nayagarh",
      subtitle: "Intermediate Education",
      description: "Pursued higher secondary education with focus on science and mathematics.",
      icon: "🎓",
      color: "#00ccff",
      details: ["Completed +2 from Divine H.S", "Scored 68.83%", "Developed analytical thinking"],
      percentage: "68.83%",
      isRange: true,
      startYear: "2020",
      endYear: "2022"
    },
    {
      id: 5,
      era: "ENGINEERING",
      year: "2022-2026",
      title: "GIET University",
      subtitle: "B.Tech Computer Science",
      description: "Started engineering journey. Learned multiple technologies, participated in hackathons, and grew as a developer.",
      icon: "🏭",
      color: "#ff66ff",
      details: [
        "Learned C, Python, Java",
        "Explored IoT technologies",
        "Data Analytics specialization",
        "Spark's to Internship",
        "Participated in multiple hackathons"
      ],
      isRange: true,
      startYear: "2022",
      endYear: "2026"
    },
    {
      id: 6,
      era: "ACHIEVEMENTS",
      year: "2025",
      title: "SIH Grand Finalist",
      subtitle: "Smart India Hackathon",
      description: "Selected for the prestigious Smart India Hackathon Grand Finale - a national level achievement.",
      icon: "🏆",
      color: "#ffd700",
      details: [
        "Selected for SIH Grand Final 2025",
        "Represented GIET University",
        "Top performer in hackathons"
      ],
      special: "GRAND FINALIST"
    },
    {
      id: 7,
      era: "INTERNSHIP",
      year: "2024-2025",
      title: "Data Analytics Intern",
      subtitle: "Spark's To Idea",
      description: "Completed internship focusing on data analytics and business intelligence solutions.",
      icon: "💼",
      color: "#00ff00",
      details: [
        "Data Analytics internship",
        "Worked on real-world projects",
        "Gained industry experience"
      ],
      isRange: true,
      startYear: "2024",
      endYear: "2025"
    },
    {
      id: 8,
      era: "PRESENT",
      year: "2026",
      title: "Job Search Journey",
      subtitle: "Loading... First Job",
      description: "Engineering journey completed. Now searching for exciting opportunities as a Full Stack Developer.",
      icon: "🔍",
      color: "#ff4444",
      details: [
        "Engineering completed",
        "Actively looking for first job",
        "Open to exciting opportunities",
        "Ready to make an impact"
      ],
      special: "🚀 LOADING..."
    }
  ];

  return (
    <div className="aboutme" ref={containerRef}>
      {/* Progress Bar */}
      <motion.div
        className="progress-bar"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Hero Section */}
      <div className="hero-section">
        <motion.div
          className="profile-container"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <div className="profile-ring">
            <div className="profile-ring-inner"></div>
            <img
              src="/images/profile.jpeg"
              alt="Biswajit Panda"
              className="profile-image"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/180x180/0d1117/00ff00?text=Biswajit";
              }}
            />
          </div>
        </motion.div>

        <motion.h1
          className="main-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          MY TEMPORAL PATH
        </motion.h1>

        <motion.h2
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          A JOURNEY OF EVOLUTION
        </motion.h2>

        <motion.div 
          className="timeline-labels"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span>BIRTH</span>
          <span>SCHOOL</span>
          <span>HIGHER SEC</span>
          <span>ENGINEERING</span>
          <span>ACHIEVEMENTS</span>
          <span>PRESENT</span>
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="timeline-container">
        <div className="timeline-line-center"></div>

        {timelineStages.map((stage, index) => (
          <motion.div
            key={stage.id}
            className={`timeline-stage ${index % 2 === 0 ? "left" : "right"}`}
            initial={{
              opacity: 0,
              x: index % 2 === 0 ? -100 : 100,
              rotateY: index % 2 === 0 ? -30 : 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              rotateY: 0,
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
          >
            {/* Zigzag Connector */}
            <div className="zigzag-connector">
              <div className="zigzag-line"></div>
            </div>

            {/* Dot */}
            <div className="timeline-dot" style={{ background: stage.color }}>
              <div className="dot-pulse"></div>
              <div className="dot-inner">{stage.icon}</div>
            </div>

            {/* Card */}
            <motion.div
              className="stage-card"
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              <div
                className="card-glow"
                style={{
                  background: `radial-gradient(circle at top, ${stage.color}30, transparent)`,
                }}
              ></div>

              <div className="card-header">
                <div className="stage-era" style={{ color: stage.color }}>
                  {stage.era}
                </div>
                {stage.special && (
                  <div className="special-badge" style={{ background: stage.color }}>
                    {stage.special}
                  </div>
                )}
              </div>

              {stage.isRange ? (
                <div className="stage-year-range" style={{ borderColor: stage.color }}>
                  {stage.startYear} → {stage.endYear}
                </div>
              ) : (
                <div className="stage-year" style={{ borderColor: stage.color }}>
                  {stage.year}
                </div>
              )}

              {stage.percentage && (
                <div className="percentage-badge" style={{ background: stage.color }}>
                  Score: {stage.percentage}
                </div>
              )}

              <h3 className="stage-title">{stage.title}</h3>
              <h4 className="stage-subtitle">{stage.subtitle}</h4>
              <p className="stage-description">{stage.description}</p>

              <ul className="stage-details">
                {stage.details.map((detail, i) => (
                  <li key={i}>
                    <span className="detail-bullet" style={{ background: stage.color }}></span>
                    {detail}
                  </li>
                ))}
              </ul>

              <div className="card-border" style={{ borderColor: stage.color }}></div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Journey Stats */}
      <motion.div 
        className="journey-stats"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">21</div>
            <div className="stat-label">Years of Life</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">18</div>
            <div className="stat-label">Years of Education</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Projects Built</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10+</div>
            <div className="stat-label">Hackathons</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">SIH</div>
            <div className="stat-label">Grand Finalist</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">🚀</div>
            <div className="stat-label">Ready for Job</div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div 
        className="timeline-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="footer-content">
          <span className="footer-icon">⚡</span>
          <p>"Every line of code is part of my evolution"</p>
          <span className="footer-icon">⚡</span>
        </div>
        <div className="loading-job">
          <div className="loading-animation">
            <span className="loading-dot">.</span>
            <span className="loading-dot">.</span>
            <span className="loading-dot">.</span>
          </div>
          <p className="job-status">🚀 First Job: LOADING...</p>
          <div className="progress-loader">
            <div className="progress-loader-bar"></div>
          </div>
        </div>
        <div className="system-status">
          <span className="status-led">●</span> TIMELINE COMPLETE
          <span className="status-led">●</span> ENGINEERING DONE
          <span className="status-led">●</span> READY FOR OPPORTUNITIES
        </div>
      </motion.div>
    </div>
  );
};

export default AboutMe;