@echo off
echo 🚀 Vido AI Frontend Fly.io'ya deploy ediliyor...

REM Frontend klasörüne git
cd vido-site

REM Fly CLI'nin yüklü olup olmadığını kontrol et
fly version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Fly CLI yüklü değil. Lütfen yükleyin: https://fly.io/docs/getting-started/installing-flyctl/
    pause
    exit /b 1
)

REM Fly.io'ya giriş yapılmış mı kontrol et
fly auth whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo 🔐 Fly.io'ya giriş yapılıyor...
    fly auth login
)

REM Fly uygulaması var mı kontrol et
fly apps list | findstr "vido-ai-frontend" >nul
if %errorlevel% neq 0 (
    echo 📦 Yeni Fly uygulaması oluşturuluyor...
    fly launch --no-deploy --copy-config --name vido-ai-frontend
)

REM Environment variables ayarla
echo 🔧 Environment variables ayarlanıyor...
fly secrets set NEXT_PUBLIC_API_URL="https://vido-ai.fly.dev"

REM Deploy et
echo 🚀 Frontend deploy ediliyor...
fly deploy

echo ✅ Frontend başarıyla deploy edildi!
echo 🌐 Frontend URL: https://vido-ai-frontend.fly.dev

REM Ana dizine geri dön
cd ..

pause 