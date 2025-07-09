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
    parser.add_argument("--platform", "-p", type=str, default="instagram", 
                       choices=["instagram", "tiktok", "youtube", "twitter"])
    parser.add_argument("--tone", "-t", type=str, default="eglenceli",
                       choices=["eglenceli", "profesyonel", "motivasyonel", "komik", "ciddi", "samimi"])
    parser.add_argument("--language", "-l", type=str, default="turkish",
                       choices=["turkish", "english"])
    args = parser.parse_args()
    user_input = args.input

    print(f"User input: {user_input}")
    print(f"Platform: {args.platform}, Tone: {args.tone}, Language: {args.language}")
    if validate_length(user_input):
        snippet = generate_branding_snippet(user_input, args.platform, args.tone, args.language)
        keywords = generate_keywords(user_input, args.language)
    else:
        raise ValueError(
            f"Input length is too long. Must be under {MAX_INPUT_LENGTH}. Submitted input is {user_input}"
        )


def validate_length(prompt: str) -> bool:
    return len(prompt) <= MAX_INPUT_LENGTH


def generate_keywords(prompt: str, language: str = "turkish") -> List[str]:
    if language == "english":
        enriched_prompt = f"Generate related branding keywords for '{prompt}'. Return as a comma separated list in English:"
    else:  # turkish
        enriched_prompt = f"'{prompt}' için ilgili branding anahtar kelimeleri üret. Virgülle ayrılmış liste olarak Türkçe döndür:"
    
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


def get_platform_style(platform: str, language: str = "turkish") -> str:
    """Platform'a özel içerik stili döndürür"""
    if language == "english":
        styles = {
            "instagram": "for Instagram Reels, viral, emoji-rich, visually focused",
            "tiktok": "for TikTok, trendy, dynamic, appealing to young audience",
            "youtube": "for YouTube, explanatory, informative, SEO-friendly",
            "twitter": "for Twitter, short, effective, with hashtags"
        }
    else:  # turkish
        styles = {
            "instagram": "Instagram Reels için viral, emoji'li, görsel odaklı",
            "tiktok": "TikTok için trend, dinamik, gençlere hitap eden",
            "youtube": "YouTube için açıklayıcı, bilgilendirici, SEO dostu",
            "twitter": "Twitter için kısa, etkili, hashtag'li"
        }
    return styles.get(platform, "genel sosyal medya için" if language == "turkish" else "for general social media")

def get_tone_style(tone: str, language: str = "turkish") -> str:
    """Ton'a özel stil döndürür"""
    if language == "english":
        tones = {
            "eglenceli": "with a fun, cheerful and positive tone",
            "profesyonel": "with a professional, reliable and serious tone",
            "motivasyonel": "with an inspiring, empowering and energetic approach",
            "komik": "with a humorous, witty and amusing way",
            "ciddi": "with a serious, formal and informative tone",
            "samimi": "with a warm, close and friendly language"
        }
    else:  # turkish
        tones = {
            "eglenceli": "eğlenceli, neşeli ve pozitif bir dille",
            "profesyonel": "profesyonel, güvenilir ve ciddi bir tonda",
            "motivasyonel": "ilham verici, güçlendirici ve enerjik bir yaklaşımla",
            "komik": "mizahi, espirili ve güldürücü bir şekilde",
            "ciddi": "ciddi, resmi ve bilgilendirici bir tonla",
            "samimi": "sıcak, yakın ve dostane bir dille"
        }
    return tones.get(tone, "doğal bir tonla" if language == "turkish" else "with a natural tone")

def generate_branding_snippet(prompt: str, platform: str = "instagram", tone: str = "eglenceli", language: str = "turkish") -> str:
    platform_style = get_platform_style(platform, language)
    tone_style = get_tone_style(tone, language)
    
    if language == "english":
        enriched_prompt = f"""
        Create an engaging 15-20 word video sentence for the topic '{prompt}' {platform_style} {tone_style}.
        
        Platform: {platform}
        Tone: {tone}
        Language: English
        
        Only provide the sentence, no additional explanation. The sentence should be ready to use directly.
        """
    else:  # turkish
        enriched_prompt = f"""
        '{prompt}' konusu için {platform_style} {tone_style} 15-20 kelimelik etkileyici bir video cümlesi oluştur.
        
        Platform: {platform}
        Ton: {tone}
        Dil: Türkçe
        
        Sadece cümleyi ver, başka açıklama yapma. Cümle doğrudan kullanılabilir olsun.
        """
    
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
    branding_text = re.sub(r'^"(.*)"$', r'\1', branding_text)  # Başındaki ve sonundaki tırnak işaretlerini kaldır
    branding_text = branding_text.strip()  # Temizleme sonrası boşlukları kaldır

    print(f"Snippet: {branding_text}")
    return branding_text


if __name__ == "__main__":
    main()