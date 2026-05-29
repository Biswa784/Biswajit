import React from "react";
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import "./Projects.css";

const projects = [
  {
    _id: 1,
    title: "NutriSathi",
    github: "https://github.com/Biswa784/NutriSathi",
    image: "https://opengraph.githubassets.com/1/Biswa784/NutriSathi",
  },
  {
    _id: 2,
    title: "Hotel-Revenue-Analysis",
    github: "https://github.com/Biswa784/Hotel-Revenue-Analysis",
    image:
      "https://opengraph.githubassets.com/1/Biswa784/Hotel-Revenue-Analysis",
  },
  {
    _id: 3,
    title: "HealthSphere",
    github: "https://github.com/Biswa784/HealthSphere",
    image: "https://opengraph.githubassets.com/1/Biswa784/HealthSphere",
  },
  {
    _id: 4,
    title: "churn-analysis-bi",
    github: "https://github.com/Biswa784/churn-analysis-bi",
    image:
      "https://opengraph.githubassets.com/1/Biswa784/churn-analysis-bi",
  },
  {
    _id: 5,
    title: "Data_visualizes",
    github: "https://github.com/Biswa784/Data_visualizes",
    image:
      "https://opengraph.githubassets.com/1/Biswa784/Data_visualizes",
  },
  {
    _id: 6,
    title: "cricket-analysis-dashboard",
    github:
      "https://github.com/Biswa784/cricket-analysis-dashboard",
    image:
      "https://opengraph.githubassets.com/1/Biswa784/cricket-analysis-dashboard",
  },
  {
    _id: 7,
    title: "Biswa784",
    github: "https://github.com/Biswa784/Biswa784",
    image: "https://opengraph.githubassets.com/1/Biswa784/Biswa784",
  },
];

const Projects = () => {
  return (
    <motion.div
      className="projects"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="projects-header">
        <h1 className="terminal-title">
          <span className="prompt">C:\Projects&gt;</span> AVAILABLE PROJECTS
        </h1>

        <p className="project-count">
          Found {projects.length} project(s)
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            className="project-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="project-image"
            />

            <div className="project-content">
              <h2>{project.title}</h2>

              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="project-btn"
              >
                View Project
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;