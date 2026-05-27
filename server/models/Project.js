const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  technologies: [{
    type: String,
    required: true,
  }],
  githubUrl: {
    type: String,
    required: true,
  },
  liveUrl: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'ARCHIVED', 'DEVELOPMENT'],
    default: 'ACTIVE',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Project', projectSchema);