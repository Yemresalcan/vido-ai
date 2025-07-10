#!/bin/bash

# Vido AI Frontend - Fly.io Deployment Script
echo "🚀 Vido AI Frontend Fly.io'ya deploy ediliyor..."

# Frontend klasörüne git
cd vido-site

# Fly CLI'nin yüklü olup olmadığını kontrol et
if ! command -v fly &> /dev/null; then
    echo "❌ Fly CLI yüklü değil. Lütfen yükleyin: https://fly.io/docs/getting-started/installing-flyctl/"
    exit 1
fi

# Fly.io'ya giriş yapılmış mı kontrol et
if ! fly auth whoami &> /dev/null; then
    echo "🔐 Fly.io'ya giriş yapılıyor..."
    fly auth login
fi

# Fly uygulaması var mı kontrol et
if ! fly apps list | grep -q "vido-ai-frontend"; then
    echo "📦 Yeni Fly uygulaması oluşturuluyor..."
    fly launch --no-deploy --copy-config --name vido-ai-frontend
fi

# Environment variables ayarla
echo "🔧 Environment variables ayarlanıyor..."
fly secrets set NEXT_PUBLIC_API_URL="https://vido-ai-backend.fly.dev"

# Deploy et
echo "🚀 Frontend deploy ediliyor..."
fly deploy

echo "✅ Frontend başarıyla deploy edildi!"
echo "🌐 Frontend URL: https://vido-ai-frontend.fly.dev"

# Ana dizine geri dön
cd .. 