# 🤝 Contributing to Vido AI

We love your input! We want to make contributing to Vido AI as easy and transparent as possible, whether it's:

- 🐛 Reporting bugs
- 💡 Submitting feature requests  
- 📝 Improving documentation
- 🔧 Submitting code changes
- 🌐 Adding translations

[🇹🇷 Türkçe Katkı Kılavuzu](./CONTRIBUTING.tr.md)

## 🚀 Development Process

We use GitHub to host code, track issues and feature requests, and accept pull requests.

### 📋 Pull Request Process

1. **Fork** the repository
2. **Create** your feature branch from `main`
3. **Make** your changes with clear commit messages
4. **Test** your changes thoroughly
5. **Update** documentation if needed
6. **Submit** a pull request

### 🏗️ Setting Up Development Environment

#### Prerequisites
- Python 3.9+
- Node.js 18+
- Git
- Docker (optional but recommended)

#### Setup Steps

1. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/vido-ai.git
   cd vido-ai
   ```

2. **Backend setup**
   ```bash
   cd app
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   # venv\Scripts\activate   # Windows
   pip install -r requirements.txt
   cp env.example .env
   # Add your GEMINI_API_KEY
   ```

3. **Frontend setup**
   ```bash
   cd vido-site
   npm install
   ```

4. **Run development servers**
   ```bash
   # Terminal 1 - Backend
   cd app && python vido_api.py
   
   # Terminal 2 - Frontend  
   cd vido-site && npm run dev
   ```

## 📝 Code Style Guidelines

### Python (Backend)
- Follow **PEP 8** style guide
- Use **type hints** for function parameters and returns
- **Docstrings** for all public functions
- **Maximum line length**: 127 characters

```python
def generate_content(prompt: str, platform: str = "instagram") -> Dict[str, Any]:
    """Generate AI content for social media platforms.
    
    Args:
        prompt: Content topic or keyword
        platform: Target social media platform
        
    Returns:
        Dictionary containing snippet and keywords
    """
    pass
```

### TypeScript/JavaScript (Frontend)
- Use **Prettier** for code formatting
- Follow **React best practices**
- Use **TypeScript** for type safety
- **Functional components** with hooks

```typescript
interface ComponentProps {
  title: string;
  isLoading: boolean;
}

const Component: React.FC<ComponentProps> = ({ title, isLoading }) => {
  return <div>{title}</div>;
};
```

### Commit Messages

We use [Conventional Commits](https://conventionalcommits.org/) format:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build/tooling changes

**Examples:**
```
feat(api): add rate limiting to endpoints
fix(frontend): resolve mobile responsive issues
docs(readme): update installation instructions
```

## 🧪 Testing

### Backend Testing
```bash
cd app
python -m pytest tests/
```

### Frontend Testing
```bash
cd vido-site
npm run test
npm run lint
```

### Integration Testing
```bash
docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

## 🐛 Bug Reports

Great bug reports tend to have:

- **Clear title** and description
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Environment details** (OS, browser, versions)
- **Screenshots** or error logs if applicable

Use our [bug report template](.github/ISSUE_TEMPLATE/bug_report.md).

## 💡 Feature Requests

We welcome feature requests! Please:

- **Check existing issues** to avoid duplicates
- **Clearly describe** the feature and its benefits
- **Consider the scope** - is it suitable for the core project?
- **Provide examples** or mockups if applicable

Use our [feature request template](.github/ISSUE_TEMPLATE/feature_request.md).

## 📚 Documentation

Help us improve our documentation:

- **Fix typos** and grammatical errors
- **Improve clarity** of existing content
- **Add examples** and use cases
- **Translate** to other languages
- **Update** outdated information

## 🌐 Internationalization

We welcome translations to make Vido AI accessible to more users:

1. **Frontend translations**: Update language files in `vido-site/locales/`
2. **Documentation**: Create `README.{lang}.md` files
3. **Backend messages**: Update error messages and responses

Current languages:
- 🇺🇸 English (default)
- 🇹🇷 Turkish

## 🏷️ Issue Labels

We use these labels to categorize issues:

| Label | Description |
|-------|-------------|
| `bug` | Something isn't working |
| `enhancement` | New feature or improvement |
| `documentation` | Documentation updates |
| `good first issue` | Good for newcomers |
| `help wanted` | Extra attention needed |
| `question` | Further information requested |
| `duplicate` | Already reported |
| `wontfix` | Won't be implemented |

## 📊 Performance Guidelines

### Frontend
- **Bundle size** optimization
- **Lazy loading** for components
- **Image optimization**
- **Minimize API calls**

### Backend
- **Response time** < 2 seconds
- **Memory usage** monitoring
- **Database query** optimization
- **Caching** implementation

## 🔒 Security

### Reporting Security Issues

Please **DO NOT** open public issues for security vulnerabilities.

Instead, email us at: **security@vido-ai.com**

### Security Best Practices

- **Input validation** for all user inputs
- **Rate limiting** on API endpoints
- **Environment variables** for sensitive data
- **HTTPS only** in production
- **Regular dependency updates**

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:

- **Contributors list** in README
- **Release notes** for significant contributions
- **Hall of Fame** for major contributors

## 📞 Getting Help

Need help with contributing?

- 💬 **GitHub Discussions** for questions
- 📧 **Email**: contribute@vido-ai.com
- 💬 **Discord**: [Join our community](https://discord.gg/vido-ai)

## 🎉 First Time Contributors

New to open source? No problem!

1. Look for issues labeled `good first issue`
2. Read our [First Contributors Guide](./docs/first-contributors.md)
3. Ask questions in discussions
4. Start small and learn as you go

Thank you for contributing to Vido AI! 🚀 