# Vercel Deployment Guide

## Quick Deployment to Vercel

### Prerequisites
1. GitHub account and repository
2. Vercel account (https://vercel.com)
3. Git installed locally

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Portfolio with resume download and contact"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Easiest)
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Select "Import Git Repository"
4. Choose your repository
5. Select "Vite" as the framework
6. Ensure:
   - **Build Command**: `cd client && npm install && npm run build`
   - **Output Directory**: `client/dist`
   - **Root Directory**: `.`
7. Add environment variables (if needed):
   - `VITE_API_URL`: Your backend API URL
8. Click "Deploy"

#### Option B: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
cd portfolioBoot
vercel

# For production deployment
vercel --prod
```

### Step 3: Configure API Backend

If you want to use the backend API, you have these options:

#### Option A: Deploy Backend to Heroku
```bash
# 1. Create Heroku account and install Heroku CLI
# 2. Create a new Procfile in server/ directory with:
web: node server.js

# 3. Push server to Heroku
cd server
heroku login
heroku create your-app-name
git push heroku main

# 4. Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set NODE_ENV=production
```

#### Option B: Deploy Backend to Railway
```bash
# 1. Create Railway account
# 2. Connect GitHub repository
# 3. Railway will auto-detect and deploy
# 4. Set environment variables in Railway dashboard
```

#### Option C: Use MongoDB Atlas + Local Development
```bash
# 1. Create MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)
# 2. Create a cluster
# 3. Get connection string
# 4. Set MONGODB_URI in Vercel environment variables
```

### Step 4: Update Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add:
   - `VITE_API_URL`: Your deployed backend URL (e.g., https://your-api.herokuapp.com/api)

### Step 5: Verify Features

After deployment, verify:
- ✅ Resume download works (📄 RESUME button in navbar)
- ✅ Email contact link works (✉️ MAIL button showing biswajitpanda871@gmail.com)
- ✅ Project links display correctly
- ✅ Navigation works smoothly

## Production Optimization

### 1. Add a robots.txt
Create `client/public/robots.txt`:
```
User-agent: *
Allow: /
Disallow: /admin

Sitemap: https://yourdomain.com/sitemap.xml
```

### 2. Add Sitemap
Create `client/public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/projects</loc>
    <priority>0.9</priority>
  </url>
</urlset>
```

### 3. Update Package.json

Ensure your client package.json has:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

### 4. Add vercel.json (Already Created)
This file configures the build process for Vercel.

## Custom Domain Setup

1. Go to Vercel Project Settings → Domains
2. Add your custom domain
3. Update DNS records:
   - CNAME: your-project.vercel.app
   - Or use Vercel nameservers

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Try: `npm install` locally and rebuild

### API Not Working
- Check VITE_API_URL environment variable
- Ensure backend is deployed and running
- Check CORS settings on backend

### Resume Download Not Working
- Verify resume.txt exists in `client/public/`
- Check browser console for errors
- Clear browser cache

### Project Links Not Showing
- Verify backend API is running
- Check network tab in browser dev tools
- Ensure projects exist in MongoDB

## After Deployment

- Update your portfolio URL in your resume
- Add the Vercel URL to your GitHub profile
- Share with recruiters and on social media

## Support

For Vercel help: https://vercel.com/docs
For Vite help: https://vitejs.dev/guide/
For React help: https://react.dev/

---

**Deployed Portfolio**: https://your-vercel-domain.com
**Email**: biswajitpanda871@gmail.com
