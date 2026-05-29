import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="card-header">
        <span className="card-prompt">C:\Projects\{project.name}&gt;</span>
      </div>
      
      {project.imageUrl && (
        <div className="card-image">
          <img src={project.imageUrl} alt={project.name} />
        </div>
      )}
      
      <div className="card-content">
        <h3 className="project-name">{project.name}</h3>
        <p className="project-description">{project.description}</p>
        
        <div className="tech-stack">
          {project.technologies?.map((tech, index) => (
            <span key={index} className="tech-tag">
              [{tech}]
            </span>
          ))}
        </div>
        
        <div className="card-footer">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="card-link">
            [VIEW_CODE]
          </a>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="card-link">
              [LIVE_DEMO]
            </a>
          )}
        </div>
      </div>
      
      <div className="card-status">
        <span className="status-indicator">●</span>
        <span className="status-text">STATUS: {project.status || 'ACTIVE'}</span>
      </div>
    </div>
  );
};

export default ProjectCard;