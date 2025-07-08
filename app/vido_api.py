from fastapi import FastAPI,HTTPException
from vido import generate_branding_snippet, generate_keywords
# AWS Lambda için mangum kaldırıldı

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
# AWS Lambda handler kaldırıldı - artık yerel FastAPI sunucusu
MAX_INPUT_LENGTH = 1000  # Limitii artırdık

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/generate_snippet")
async def generate_snippet_api(prompt: str):
    validate_input_length(prompt)
    snippet = generate_branding_snippet(prompt)
    return {"snippet": snippet, "keywords": []}

@app.get("/generate_keywords")
async def generate_keywords_api(prompt: str):
    validate_input_length(prompt)
    keywords = generate_keywords(prompt)
    return {"snippet": None, "keywords": keywords}

@app.get("/generate_snippet_and_keywords")
async def generate_keywords_api(prompt: str):
    validate_input_length(prompt)
    snippet = generate_branding_snippet(prompt)
    keywords = generate_keywords(prompt)
    return {"snippet": snippet, "keywords": keywords}

def validate_input_length(prompt: str):
    if len(prompt) >= MAX_INPUT_LENGTH:
        raise HTTPException(
            status_code=400,
            detail=f"Input length is too long. Must be under {MAX_INPUT_LENGTH} characters.",
        )


# Yerel geliştirme için uvicorn server başlatıcı
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8008)


