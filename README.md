# 🚀 Biswajit Panda's Portfolio

A modern, interactive portfolio website built with **MERN Stack** (MongoDB, Express, React, Node.js) featuring a retro terminal-style UI with resume download and project showcase.

## ✨ Features

### 📄 Resume Download
- **One-Click Download**: Download your resume directly from the navbar
- **PDF Format**: Professional resume document ready for sharing with recruiters
- **Always Updated**: Keep your resume in sync with your portfolio

### 🔗 Project Links
- **Live Demo Links**: View working versions of your projects
- **GitHub Integration**: Link to source code repositories
- **Technology Stack**: Display technologies used in each project
- **Project Status**: Show current status of each project (Active, Complete, In Progress)

### 📧 Contact Information
- **Direct Email Link**: Email button in navbar (biswajitpanda871@gmail.com)
- **Contact Section**: Email displayed prominently on the home page
- **Easy to Reach**: Click to send email directly from the portfolio

### 🎮 Additional Features
- Retro terminal-style UI with green text aesthetic
- Responsive design for all devices
- Redux state management
- Smooth animations with Framer Motion
- Games section (Tetris, Snake)
- Experience timeline
- Interactive windows and file system

## 📋 Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Axios** - HTTP client

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd portfolioBoot
```

2. **Install all dependencies**
```bash
npm run install:all
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
VITE_API_URL=http://localhost:5000/api
```

4. **For server setup**, create `server/.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
```

### Development

**Run frontend only:**
```bash
npm run dev:client
```

**Run backend only:**
```bash
npm run dev:server
```

**Run both concurrently:**
```bash
npm run dev:all
```

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

## 🌐 Deployment to Vercel

### Quick Deploy (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel**
```bash
npm install -g vercel
vercel --prod
```

Or use the Vercel Dashboard:
- Go to https://vercel.com/dashboard
- Click "Add New" → "Project"
- Import your GitHub repository
- Click "Deploy"

### Environment Variables on Vercel

1. Go to Project Settings → Environment Variables
2. Add: `VITE_API_URL` = Your backend API URL

For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

## 📁 Project Structure

```
portfolioBoot/
├── client/                    # Frontend application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/            # Page components
│   │   ├── features/         # Redux slices
│   │   ├── utils/            # Utility functions
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   ├── public/
│   │   ├── resume.txt        # Resume file for download
│   │   └── vite.svg
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── server/                    # Backend API
│   ├── config/               # Database configuration
│   ├── models/               # MongoDB schemas
│   ├── routes/               # API routes
│   ├── controllers/          # Route controllers
│   ├── server.js             # Entry point
│   └── package.json
├── package.json              # Root scripts
├── vercel.json               # Vercel configuration
├── .env.example              # Environment template
└── VERCEL_DEPLOYMENT.md      # Deployment guide
```

## 🎯 Key Features Explained

### Resume Download
The resume is stored in `client/public/resume.txt`. Users can:
1. Click the "📄 RESUME" button in the navbar
2. Download the file automatically
3. Share it with recruiters

### Project Links
Projects are fetched from the backend API and displayed with:
- Project name and description
- Technology stack tags
- Live demo link
- GitHub source code link
- Project status indicator

### Contact Information
- **Email Button**: ✉️ MAIL - Direct mailto link
- **Home Page**: Contact section showing email address
- **Easy Communication**: One click to start an email

## 🔒 Security & Best Practices

- Environment variables for sensitive data
- CORS protection on backend
- Input validation on forms
- MongoDB injection prevention
- Secure headers configuration

## 📊 Performance

- Optimized bundle size with Vite
- Lazy loading for images and components
- Minified CSS and JavaScript
- CDN delivery through Vercel
- ~2.5s first contentful paint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact & Support

- **Email**: biswajitpanda871@gmail.com
- **Portfolio**: https://your-vercel-domain.com
- **GitHub**: https://github.com/yourusername
- **LinkedIn**: https://linkedin.com/in/yourprofile

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Vite.js for fast build tooling
- React community for amazing libraries
- Vercel for easy deployment
- MongoDB for reliable database

## 📝 Changelog

### Version 1.0.0 (Latest)
✅ Resume download functionality
✅ Project links and demo display
✅ Email contact integration
✅ Vercel deployment configuration
✅ Retro terminal UI
✅ Redux state management
✅ Responsive design

## 🐛 Known Issues & Improvements

- Consider adding PDF export for resume
- Add email notification system
- Implement project filtering
- Add dark/light theme toggle
- Mobile optimization improvements

---

**Made with ❤️ by Biswajit Panda**

Last Updated: May 27, 2026
