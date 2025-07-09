from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
import re
import time
from vido import generate_branding_snippet, generate_keywords
# AWS Lambda için mangum kaldırıldı


app = FastAPI(
    title="Vido AI API",
    description="AI-powered content generation for social media platforms",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# AWS Lambda handler kaldırıldı - artık yerel FastAPI sunucusu
MAX_INPUT_LENGTH = 1000  # Limitii artırdık

# Security middleware
app.add_middleware(
    TrustedHostMiddleware, 
    allowed_hosts=[
        "localhost", 
        "127.0.0.1", 
        "*.vercel.app", 
        "*.fly.dev",
        "vido-ai-backend.fly.dev"
    ]
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://127.0.0.1:3000", 
        "https://*.vercel.app",
        "https://vido-ai.vercel.app",
        "https://vido-ai-frontend.vercel.app"
    ],
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)

# Rate limiting storage (simple in-memory)
request_times = {}


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "Vido AI API is running!",
        "version": "1.0.0",
        "status": "healthy",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    """Health check for monitoring"""
    return {"status": "healthy", "service": "vido-ai-backend"}

@app.get("/generate_snippet")
async def generate_snippet_api(prompt: str, platform: str = "instagram", tone: str = "eglenceli"):
    validate_input_length(prompt)
    snippet = generate_branding_snippet(prompt, platform, tone)
    return {"snippet": snippet, "keywords": []}

@app.get("/generate_keywords")
async def generate_keywords_api(prompt: str):
    validate_input_length(prompt)
    keywords = generate_keywords(prompt)
    return {"snippet": None, "keywords": keywords}

@app.get("/generate_snippet_and_keywords")
async def generate_keywords_api(
    request: Request,
    prompt: str, 
    platform: str = "instagram", 
    tone: str = "eglenceli", 
    language: str = "turkish"
):
    # Security validations
    client_ip = request.client.host if request.client else "unknown"
    check_rate_limit(client_ip)
    validate_input_length(prompt)
    validate_input_content(prompt)
    validate_parameters(platform, tone, language)
    
    try:
        snippet = generate_branding_snippet(prompt, platform, tone, language)
        keywords = generate_keywords(prompt, language)
        return {"snippet": snippet, "keywords": keywords}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="Internal server error. Please try again later.",
        )

def validate_input_length(prompt: str):
    if len(prompt) >= MAX_INPUT_LENGTH:
        raise HTTPException(
            status_code=400,
            detail=f"Input length is too long. Must be under {MAX_INPUT_LENGTH} characters.",
        )

def validate_input_content(prompt: str):
    """Input content validation"""
    if not prompt or not prompt.strip():
        raise HTTPException(
            status_code=400,
            detail="Prompt cannot be empty.",
        )
    
    # Check for potentially malicious content
    malicious_patterns = [
        r'<script.*?>.*?</script>',
        r'javascript:',
        r'on\w+\s*=',
        r'eval\s*\(',
        r'exec\s*\(',
    ]
    
    for pattern in malicious_patterns:
        if re.search(pattern, prompt, re.IGNORECASE):
            raise HTTPException(
                status_code=400,
                detail="Invalid input content detected.",
            )

def check_rate_limit(client_ip: str):
    """Simple rate limiting: max 10 requests per minute"""
    current_time = time.time()
    minute_ago = current_time - 60
    
    # Clean old requests
    if client_ip in request_times:
        request_times[client_ip] = [
            req_time for req_time in request_times[client_ip] 
            if req_time > minute_ago
        ]
    else:
        request_times[client_ip] = []
    
    # Check limit
    if len(request_times[client_ip]) >= 10:
        raise HTTPException(
            status_code=429,
            detail="Rate limit exceeded. Try again later.",
        )
    
    # Add current request
    request_times[client_ip].append(current_time)

def validate_parameters(platform: str, tone: str, language: str):
    """Validate API parameters"""
    valid_platforms = ["instagram", "tiktok", "youtube", "twitter"]
    valid_tones = ["eglenceli", "profesyonel", "motivasyonel", "komik", "ciddi", "samimi"]
    valid_languages = ["turkish", "english"]
    
    if platform not in valid_platforms:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid platform. Must be one of: {', '.join(valid_platforms)}",
        )
    
    if tone not in valid_tones:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid tone. Must be one of: {', '.join(valid_tones)}",
        )
    
    if language not in valid_languages:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid language. Must be one of: {', '.join(valid_languages)}",
        )


# Yerel geliştirme için uvicorn server başlatıcı
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)


