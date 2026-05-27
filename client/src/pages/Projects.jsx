import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../features/projects/projectSlice';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  const dispatch = useDispatch();
  const { projects, status, error } = useSelector((state) => state.projects);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProjects());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <div className="projects-loading">
        <div className="terminal-loader">
          <span className="prompt">C:\&gt;</span> LOADING PROJECTS...
          <span className="cursor">_</span>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="projects-error">
        <div className="error-message">
          <span className="prompt">C:\&gt;</span> ERROR: {error}
        </div>
      </div>
    );
  }

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
        <p className="project-count">Found {projects.length} project(s)</p>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;