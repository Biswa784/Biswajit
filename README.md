# Biswajit Panda's Portfolio 🚀
https://biswajit-wtmm.vercel.app

A stunning **MERN Stack** portfolio website with a retro terminal UI theme, showcasing projects, certifications, and achievements.

![React](https://img.shields.io/badge/React-18.0-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-16+-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-blue?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-Latest-purple?logo=vite)

## 🎯 Features

✨ **Interactive Terminal UI** - Retro-styled interface with animated ASCII art  
📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile  
🎨 **Modern Design** - TailwindCSS + Framer Motion animations  
📊 **GitHub Integration** - Real-time repository stats and links  
🔄 **Live Updates** - Backend API for dynamic content  
⚡ **Fast Performance** - Optimized with Vite build tool  
🎯 **Project Showcase** - Interactive project cards with detailed modals  
🏆 **Certifications & Achievements** - Auto-scrolling carousels  

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS
- **Framer Motion** - Smooth animations
- **React Icons** - Icon library
- **Redux** - State management (if needed)

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Nodemon** - Development auto-reload

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas cluster)
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Biswa784/portfolioBoot.git
cd portfolioBoot
```

### 2. Install Dependencies

**Frontend:**
```bash
cd client
npm install
```

**Backend:**
```bash
cd ../server
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the `server` directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
CORS_ORIGIN=http://localhost:5173
```

Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start Development Servers

**Option A: Run both servers together**
```bash
npm run dev:all
```

**Option B: Run separately**

Terminal 1 - Frontend:
```bash
npm run dev:client
```

Terminal 2 - Backend:
```bash
npm run dev:server
```

The frontend will be available at: `http://localhost:5173`  
The backend API at: `http://localhost:5000`

## 📁 Project Structure

```
portfolioBoot/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── features/      # Redux slices
│   │   ├── utils/         # Utility functions
│   │   └── App.jsx
│   ├── public/            # Static assets
│   └── vite.config.js
├── server/                # Node.js backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── seeds/             # Database seed data
│   └── server.js
├── .env.example           # Environment variables template
└── README.md
```

## 🎨 Components Overview

### Pages
- **Home** - Landing page with hero section and terminal UI
- **About Me** - Background, skills, and experience
- **Projects** - Interactive project showcase with GitHub stats
- **Games** - Snake Game & Tic Tac Toe
- **Boot Screen** - Custom retro boot animation

### Features
- **Project Display** - Real-time GitHub repository statistics
- **Certifications** - Auto-scrolling certification carousel
- **Achievements** - Scrollable achievements showcase
- **Contact Options** - Multiple ways to get in touch
- **Responsive Terminal** - Mobile-friendly terminal sidebar

## 🔌 API Endpoints

### Projects
```
GET  /api/projects           - Get all projects
GET  /api/projects/:id       - Get specific project
POST /api/projects           - Create new project (admin only)
```

### Games
```
GET  /api/games/snake/scores        - Get snake game scores
POST /api/games/snake/score         - Save snake game score
GET  /api/games/tictactoe/matches   - Get tic-tac-toe matches
```

### Health Check
```
GET  /api/health            - Server health status
```

## 🎮 Game Features

### Snake Game
- Classic snake gameplay
- Score tracking to database
- Difficulty levels
- High score leaderboard

### Tic Tac Toe
- Play against the computer
- Score history
- Move tracking
- Interactive UI

## 📊 Database Schema

### Project
```javascript
{
  id: ObjectId,
  title: String,
  description: String,
  repo: String,
  technologies: [String],
  imageUrl: String,
  stars: Number,
  forks: Number,
  createdAt: Date
}
```

### SnakeScore
```javascript
{
  playerName: String,
  score: Number,
  difficulty: String,
  date: Date
}
```

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
# Deploy dist folder to Vercel
```

### Backend (Render / Railway)
1. Push code to GitHub
2. Connect repository to Render/Railway
3. Add environment variables
4. Deploy from main branch

## 🛠️ Available Scripts

```bash
# Root level
npm run dev:all           # Start both servers
npm run dev:client        # Start frontend only
npm run dev:server        # Start backend only

# Client
npm run dev               # Development server
npm run build             # Production build
npm run preview           # Preview production build

# Server
npm run start             # Production start
npm run dev               # Development with nodemon
npm run seed              # Seed database with sample data
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change port in .env
PORT=5001
```

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
mongod

# Or use MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

## 📝 Environment Variables Reference

See `.env.example` for complete template.

**Frontend (.env)**
- `VITE_API_URL` - Backend API base URL

**Backend (.env)**
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `CORS_ORIGIN` - Frontend URL for CORS
- `JWT_SECRET` - JWT token secret (if using auth)

## 🤝 Contributing

Contributions are welcome! Feel free to fork and submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Biswajit Panda**
- 📧 Email: biswajitpanda871@gmail.com
- 🔗 GitHub: [Biswa784](https://github.com/Biswa784)
- 💼 LinkedIn: [Biswajit Panda](https://linkedin.com/in/biswajit-panda)

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [React](https://react.dev/) - UI library
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [MongoDB](https://www.mongodb.com/) - Database
- [Express.js](https://expressjs.com/) - Web framework

## 📞 Support

For issues and questions:
- Open an [Issue](https://github.com/Biswa784/portfolioBoot/issues)
- Check existing documentation
- Review error logs

---

**Made with ❤️ by Biswajit Panda**
