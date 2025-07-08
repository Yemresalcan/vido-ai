import os
from typing import List
import google.generativeai as genai
import argparse
import re
from dotenv import load_dotenv

# .env dosyasındaki değişkenleri yükle
load_dotenv()

MAX_INPUT_LENGTH = 1000 # Gemini için karakter limitini artırabiliriz.

# Gemini API anahtarını ortam değişkeninden al
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY ortam değişkeni .env dosyasında veya sistemde bulunamadı.")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash-latest')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input

    print(f"User input: {user_input}")
    if validate_length(user_input):
        snippet = generate_branding_snippet(user_input)
        keywords = generate_keywords(user_input)
    else:
        raise ValueError(
            f"Input length is too long. Must be under {MAX_INPUT_LENGTH}. Submitted input is {user_input}"
        )


def validate_length(prompt: str) -> bool:
    return len(prompt) <= MAX_INPUT_LENGTH


def generate_keywords(prompt: str) -> List[str]:
    enriched_prompt = f"Generate related branding keywords for {prompt}. Return as a comma separated list:"
    print(f"Enriched prompt for keywords: {enriched_prompt}")

    try:
        response = model.generate_content(enriched_prompt)
        keywords_text = response.text
    except Exception as e:
        print(f"Error generating keywords: {e}")
        return []

    keywords_text = keywords_text.strip()
    keywords_array = re.split(",|\n|;|\\-", keywords_text)
    keywords_array = [k.lower().strip() for k in keywords_array if k.strip()]
    
    print(f"Keywords: {keywords_array}")
    return keywords_array


def generate_branding_snippet(prompt: str) -> str:
    enriched_prompt = f"{prompt} kelimesi için en iyi video cümlesini yaz (yaklaşık 15-20 kelime):"
    print(f"Enriched prompt for snippet: {enriched_prompt}")
    
    try:
        response = model.generate_content(enriched_prompt)
        branding_text = response.text
    except Exception as e:
        print(f"Error generating snippet: {e}")
        return "Error generating snippet."

    branding_text = branding_text.strip()
    
    # Yıldızları ve diğer gereksiz karakterleri temizle
    branding_text = re.sub(r'\*+', '', branding_text)  # *** yıldızları kaldır
    branding_text = re.sub(r'^\s*[-•]\s*', '', branding_text)  # Başındaki - veya • işaretlerini kaldır
    branding_text = branding_text.strip()  # Temizleme sonrası boşlukları kaldır

    # Cümlenin sonuna uygun noktalama işareti ekle (opsiyonel, Gemini genellikle bunu yapar)
    # if branding_text and branding_text[-1] not in {".", "!", "?"}:
    #     branding_text += "..."

    print(f"Snippet: {branding_text}")
    return branding_text


if __name__ == "__main__":
    main()