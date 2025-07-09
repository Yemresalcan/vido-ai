# 🐍 Vido AI Backend

FastAPI tabanlı backend servisi. Google Gemini AI ile içerik üretimi yapar.

## 📁 Dosya Yapısı

```
app/
├── vido_api.py        # FastAPI application & API endpoints
├── vido.py           # AI content generation logic
├── requirements.txt  # Python dependencies
├── .env.example     # Environment variables template
└── venv/           # Virtual environment (gitignore'da)
```

## ⚙️ Kurulum

### 1. Virtual Environment
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux
```

### 2. Dependencies
```bash
pip install -r requirements.txt
```

### 3. Environment Variables
```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

### 4. Server Başlatma
```bash
python vido_api.py
```

Server http://localhost:8000 adresinde çalışır.

## 🔌 API Endpoints

### POST `/generate`
İçerik üretimi yapar.

**Request Body:**
```json
{
    "keyword": "teknoloji",
    "platform": "instagram",
    "tone": "professional",
    "language": "tr"
}
```

**Response:**
```json
{
    "title": "Teknoloji Dünyasında Yenilikler",
    "description": "Teknoloji sektöründeki son gelişmeler...",
    "keywords": ["teknoloji", "inovasyon", "gelişim"]
}
```

### GET `/health`
Servis durumu kontrolü.

## 🎯 Platform & Ton Kombinasyonları

### Desteklenen Platformlar
- `instagram` - Görsel odaklı içerik
- `tiktok` - Kısa video içerikleri  
- `youtube` - Uzun form videolar
- `twitter` - Kısa metinler

### Desteklenen Tonlar
- `professional` - Profesyonel
- `casual` - Samimi
- `humorous` - Komik
- `educational` - Eğitici
- `emotional` - Duygusal
- `trendy` - Trend

### Desteklenen Diller
- `tr` - Türkçe
- `en` - İngilizce

## 🧠 AI Logic

### Prompt Engineering
Her platform ve ton için özel prompt'lar:
- Platform-spesifik içerik formatları
- Ton-uyumlu yazı stilleri
- Dil-spesifik kültürel referanslar

### Content Generation Flow
1. Kullanıcı girdisi alınır
2. Platform & ton stiline göre prompt oluşturulur
3. Gemini AI'dan içerik üretilir
4. Text cleaning yapılır (asterisk, bullet temizleme)
5. Structured response döndürülür

## 🔧 Development

### Local Testing
```bash
# Test endpoint
curl -X POST "http://localhost:8000/generate" \
     -H "Content-Type: application/json" \
     -d '{"keyword":"test","platform":"instagram","tone":"casual","language":"tr"}'
```

### Code Style
- Python 3.8+ syntax
- Type hints kullanılır
- Async/await pattern
- Error handling ile robust API

## 📦 Dependencies

### Ana Bağımlılıklar
- `fastapi` - Web framework
- `uvicorn` - ASGI server
- `google-generativeai` - Gemini AI client
- `python-dotenv` - Environment variables
- `python-multipart` - Form data handling

### Development
```bash
pip install -r requirements.txt
```

## 🐛 Troubleshooting

### Common Issues

**1. Gemini API Key Error**
```
Error: Gemini API key not found
```
**Çözüm**: `.env` dosyasında `GEMINI_API_KEY` set edin.

**2. Virtual Environment Issues**
```
ModuleNotFoundError: No module named 'fastapi'
```
**Çözüm**: Virtual environment aktif olduğundan emin olun.

**3. Port Already in Use**
```
OSError: [Errno 48] Address already in use
```
**Çözüm**: Port 8000'i kullanan process'i durdurun veya farklı port kullanın.

## 🚀 Production Deployment

### Docker (Opsiyonel)
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "vido_api:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment Variables (Production)
```env
GEMINI_API_KEY=prod_api_key
CORS_ORIGINS=https://yourdomain.com
LOG_LEVEL=INFO
``` 