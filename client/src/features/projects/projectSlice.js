import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Fallback demo projects for when backend is not available
const FALLBACK_PROJECTS = [
  {
    _id: '1',
    name: 'Portfolio Website',
    description: 'Interactive portfolio with retro terminal UI built with MERN stack',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux', 'Tailwind CSS'],
    githubUrl: 'https://github.com/yourusername/portfolio',
    liveUrl: 'https://your-portfolio.vercel.app',
    status: 'Active'
  },
  {
    _id: '2',
    name: 'Project Management App',
    description: 'Full-stack application for managing projects and tasks with real-time updates',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Redux'],
    githubUrl: 'https://github.com/yourusername/project-manager',
    liveUrl: 'https://project-manager-app.vercel.app',
    status: 'Complete'
  },
  {
    _id: '3',
    name: 'E-Commerce Platform',
    description: 'Full-featured e-commerce platform with payment integration and inventory management',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Express'],
    githubUrl: 'https://github.com/yourusername/ecommerce',
    liveUrl: 'https://ecommerce-platform.vercel.app',
    status: 'Active'
  }
];

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      // Try to fetch from API
      const response = await axios.get(`${API_URL}/projects`, {
        timeout: 5000 // 5 second timeout
      });
      return response.data;
    } catch (error) {
      console.warn('Could not fetch from API, using fallback projects:', error.message);
      // Return fallback projects if API fails
      return FALLBACK_PROJECTS;
    }
  }
);

const initialState = {
  projects: [],
  status: 'idle',
  error: null,
};

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'succeeded'; // Still show fallback projects
        state.projects = FALLBACK_PROJECTS;
        state.error = null; // Don't show error to user
      });
  },
});

export default projectSlice.reducer;