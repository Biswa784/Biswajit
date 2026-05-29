const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Project = require('../models/Project');

dotenv.config();

const projectsData = [
  {
    name: 'NutriSathi',
    description: 'A nutrition and health tracking application that helps users monitor their dietary intake and get personalized nutritional recommendations.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Nutrition API'],
    githubUrl: 'https://github.com/Biswa784/NutriSathi',
    imageUrl: 'https://raw.githubusercontent.com/Biswa784/NutriSathi/main/readme_assets/cover.png',
    status: 'ACTIVE',
  },
  {
    name: 'Hotel-Revenue-Analysis',
    description: 'Comprehensive data analysis dashboard for hotel revenue metrics, occupancy rates, and revenue forecasting with interactive visualizations.',
    technologies: ['Python', 'Pandas', 'Matplotlib', 'Tableau', 'SQL'],
    githubUrl: 'https://github.com/Biswa784/Hotel-Revenue-Analysis',
    imageUrl: 'https://raw.githubusercontent.com/Biswa784/Hotel-Revenue-Analysis/main/assets/dashboard_preview.png',
    status: 'ACTIVE',
  },
  {
    name: 'HealthSphere',
    description: 'A comprehensive healthcare management platform providing patient records, appointment scheduling, and telemedicine features.',
    technologies: ['React', 'TypeScript', 'Firebase', 'Node.js', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Biswa784/HealthSphere',
    imageUrl: 'https://raw.githubusercontent.com/Biswa784/HealthSphere/main/docs/screenshot.png',
    status: 'ACTIVE',
  },
  {
    name: 'churn-analysis-bi',
    description: 'Business Intelligence solution for analyzing customer churn patterns with predictive models and actionable insights for retention strategies.',
    technologies: ['Python', 'scikit-learn', 'Power BI', 'Pandas', 'SQL'],
    githubUrl: 'https://github.com/Biswa784/churn-analysis-bi',
    imageUrl: 'https://raw.githubusercontent.com/Biswa784/churn-analysis-bi/main/assets/dashboard.png',
    status: 'ACTIVE',
  },
  {
    name: 'Data_visualizes',
    description: 'Collection of interactive data visualization projects showcasing real-world datasets with D3.js, Plotly, and custom visualizations.',
    technologies: ['D3.js', 'Python', 'Plotly', 'JavaScript', 'Data Science'],
    githubUrl: 'https://github.com/Biswa784/Data_visualizes',
    imageUrl: 'https://raw.githubusercontent.com/Biswa784/Data_visualizes/main/preview/visualization_preview.png',
    status: 'ACTIVE',
  },
  {
    name: 'cricket-analysis-dashboard',
    description: 'Real-time cricket analytics dashboard featuring player statistics, match predictions, and performance analytics with live data updates.',
    technologies: ['React', 'D3.js', 'Node.js', 'MongoDB', 'Websockets'],
    githubUrl: 'https://github.com/Biswa784/cricket-analysis-dashboard',
    imageUrl: 'https://raw.githubusercontent.com/Biswa784/cricket-analysis-dashboard/main/assets/dashboard_snapshot.png',
    status: 'ACTIVE',
  },
  {
    name: 'Biswa784',
    description: 'Personal portfolio and profile repository showcasing all projects, skills, and professional experience as a full-stack developer.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Vercel'],
    githubUrl: 'https://github.com/Biswa784/Biswa784',
    imageUrl: 'https://raw.githubusercontent.com/Biswa784/Biswa784/main/profile_banner.png',
    status: 'ACTIVE',
  },
];

async function seedProjects() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');

    // Insert new projects
    const insertedProjects = await Project.insertMany(projectsData);
    console.log(`✅ Successfully seeded ${insertedProjects.length} projects!`);
    console.log('Projects added:');
    insertedProjects.forEach((project) => {
      console.log(`  - ${project.name}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding projects:', error);
    process.exit(1);
  }
}

seedProjects();
