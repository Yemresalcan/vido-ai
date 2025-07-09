from setuptools import setup, find_packages

with open("../README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

with open("requirements.txt", "r", encoding="utf-8") as fh:
    requirements = [line.strip() for line in fh if line.strip() and not line.startswith("#")]

setup(
    name="vido-ai-backend",
    version="1.0.0",
    author="Yunus Emre Salcan",
    author_email="yunusemresalcan@gmail.com",
    description="AI-powered content generation for social media platforms - Backend API",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/Yemresalcan/vido-ai",
    project_urls={
        "Bug Tracker": "https://github.com/Yemresalcan/vido-ai/issues",
        "Documentation": "https://github.com/Yemresalcan/vido-ai/wiki",
        "Source Code": "https://github.com/Yemresalcan/vido-ai",
    },
    classifiers=[
        "Development Status :: 5 - Production/Stable",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Framework :: FastAPI",
        "Topic :: Internet :: WWW/HTTP :: HTTP Servers",
        "Topic :: Scientific/Engineering :: Artificial Intelligence",
        "Topic :: Software Development :: Libraries :: Python Modules",
    ],
    packages=find_packages(),
    python_requires=">=3.9",
    install_requires=requirements,
    extras_require={
        "dev": [
            "pytest>=7.0.0",
            "black>=22.0.0",
            "flake8>=4.0.0",
            "mypy>=0.910",
        ],
        "test": [
            "pytest>=7.0.0",
            "pytest-asyncio>=0.18.0",
            "httpx>=0.23.0",
        ],
    },
    keywords=[
        "ai", "artificial-intelligence", "content-generation", "social-media",
        "fastapi", "google-gemini", "instagram", "tiktok", "youtube", "twitter",
        "nlp", "machine-learning", "api", "web-service"
    ],
    include_package_data=True,
    zip_safe=False,
    entry_points={
        "console_scripts": [
            "vido-ai=vido_api:main",
        ],
    },
) 
