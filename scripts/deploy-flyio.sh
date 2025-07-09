#!/bin/bash

echo "🚀 Deploying Vido AI Backend to Fly.io..."

cd app

echo "📦 Checking Fly CLI installation..."
if ! command -v fly &> /dev/null; then
    echo "❌ Fly CLI not found! Please install it first:"
    echo "https://fly.io/docs/hands-on/install-flyctl/"
    exit 1
fi

echo "🔐 Login to Fly.io (if needed)..."
if ! fly auth whoami &> /dev/null; then
    echo "Please login to Fly.io:"
    fly auth login
fi

echo "🏗️ Deploying to Fly.io..."
if ! fly deploy; then
    echo "❌ Deployment failed!"
    exit 1
fi

echo "✅ Backend deployed successfully!"
echo "🌐 Your API is live at: https://vido-ai-backend.fly.dev"
echo "📖 API Docs: https://vido-ai-backend.fly.dev/docs"

echo ""
echo "📝 Next steps:"
echo "1. Update frontend environment variables with the new API URL"
echo "2. Deploy frontend to Vercel"  
echo "3. Test the full application" 