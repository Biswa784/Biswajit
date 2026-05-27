#!/bin/bash

# ============================================================================
# Biswajit Panda Portfolio - Quick Vercel Deployment Script
# ============================================================================
# This script automates the deployment process to Vercel
# Usage: bash deploy.sh
# ============================================================================

set -e

echo "🚀 Biswajit Panda Portfolio - Vercel Deployment"
echo "============================================================================"
echo ""

# Step 1: Check if git is initialized
echo "📦 Step 1: Checking Git repository..."
if [ ! -d ".git" ]; then
    echo "   Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Portfolio with resume download and contact"
    echo "   ✅ Git repository initialized"
else
    echo "   ✅ Git repository already initialized"
fi

echo ""

# Step 2: Check if Vercel CLI is installed
echo "📦 Step 2: Checking Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    echo "   Installing Vercel CLI..."
    npm install -g vercel
    echo "   ✅ Vercel CLI installed"
else
    echo "   ✅ Vercel CLI already installed"
fi

echo ""

# Step 3: Build the client
echo "📦 Step 3: Building client application..."
cd client
npm install
npm run build
cd ..
echo "   ✅ Client build successful"

echo ""

# Step 4: Deploy to Vercel
echo "📦 Step 4: Deploying to Vercel..."
echo ""
echo "   IMPORTANT: The following will open Vercel login in your browser"
echo "   1. Log in to your Vercel account"
echo "   2. When asked, link to your GitHub repository"
echo "   3. Configure build settings (should auto-detect)"
echo "   4. Deploy!"
echo ""

vercel --prod

echo ""
echo "============================================================================"
echo "✅ DEPLOYMENT COMPLETE!"
echo "============================================================================"
echo ""
echo "Your portfolio is now live! 🎉"
echo ""
echo "Features deployed:"
echo "  📄 Resume Download    - Click '📄 RESUME' in navbar"
echo "  🔗 Project Links      - View on /projects page"
echo "  📧 Contact Email      - Click '✉️ MAIL' button or in home page"
echo ""
echo "Next steps:"
echo "  1. Share your portfolio URL"
echo "  2. Update your resume with the portfolio link"
echo "  3. Add to GitHub profile"
echo ""
echo "============================================================================
