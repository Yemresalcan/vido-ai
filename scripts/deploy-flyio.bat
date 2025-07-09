@echo off
echo 🚀 Deploying Vido AI Backend to Fly.io...

cd app

echo 📦 Checking Fly CLI installation...
fly version
if errorlevel 1 (
    echo ❌ Fly CLI not found! Please install it first:
    echo https://fly.io/docs/hands-on/install-flyctl/
    pause
    exit /b 1
)

echo 🔐 Login to Fly.io (if needed)...
fly auth whoami
if errorlevel 1 (
    echo Please login to Fly.io:
    fly auth login
)

echo 🏗️ Deploying to Fly.io...
fly deploy

if errorlevel 1 (
    echo ❌ Deployment failed!
    pause
    exit /b 1
)

echo ✅ Backend deployed successfully!
echo 🌐 Your API is live at: https://vido-ai-backend.fly.dev
echo 📖 API Docs: https://vido-ai-backend.fly.dev/docs

echo.
echo 📝 Next steps:
echo 1. Update frontend environment variables with the new API URL
echo 2. Deploy frontend to Vercel
echo 3. Test the full application

pause 