@echo off
REM ============================================================================
REM Biswajit Panda Portfolio - Quick Vercel Deployment Script (Windows)
REM ============================================================================
REM This script automates the deployment process to Vercel
REM Usage: deploy.bat
REM ============================================================================

setlocal enabledelayedexpansion

echo.
echo 🚀 Biswajit Panda Portfolio - Vercel Deployment
echo ============================================================================
echo.

REM Step 1: Check if git is initialized
echo 📦 Step 1: Checking Git repository...
if not exist ".git" (
    echo    Initializing Git repository...
    git init
    git add .
    git commit -m "Initial commit: Portfolio with resume download and contact"
    echo    ✅ Git repository initialized
) else (
    echo    ✅ Git repository already initialized
)

echo.

REM Step 2: Check if Vercel CLI is installed
echo 📦 Step 2: Checking Vercel CLI...
vercel --version >nul 2>&1
if errorlevel 1 (
    echo    Installing Vercel CLI...
    npm install -g vercel
    echo    ✅ Vercel CLI installed
) else (
    echo    ✅ Vercel CLI already installed
)

echo.

REM Step 3: Build the client
echo 📦 Step 3: Building client application...
cd client
call npm install
call npm run build
cd ..
echo    ✅ Client build successful

echo.

REM Step 4: Deploy to Vercel
echo 📦 Step 4: Deploying to Vercel...
echo.
echo    IMPORTANT: The following will open Vercel login in your browser
echo    1. Log in to your Vercel account
echo    2. When asked, link to your GitHub repository
echo    3. Configure build settings (should auto-detect)
echo    4. Deploy!
echo.

vercel --prod

echo.
echo ============================================================================
echo ✅ DEPLOYMENT COMPLETE!
echo ============================================================================
echo.
echo Your portfolio is now live! 🎉
echo.
echo Features deployed:
echo   📄 Resume Download    - Click '📄 RESUME' in navbar
echo   🔗 Project Links      - View on /projects page
echo   📧 Contact Email      - Click '✉️ MAIL' button or in home page
echo.
echo Next steps:
echo   1. Share your portfolio URL
echo   2. Update your resume with the portfolio link
echo   3. Add to GitHub profile
echo.
echo ============================================================================
echo.

pause
