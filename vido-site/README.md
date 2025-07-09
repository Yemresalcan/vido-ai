# ⚛️ Vido AI Frontend

Next.js tabanlı modern web arayüzü. AI destekli içerik üretimi için kullanıcı dostu deneyim sunar.

## 📁 Dosya Yapısı

```
vido-site/
├── components/          # React bileşenleri
│   ├── form.tsx        # Ana form bileşeni (platform/ton seçimi)
│   ├── result.tsx      # Sonuç gösterim bileşeni
│   └── vido.tsx        # Ana container bileşeni
├── pages/              # Next.js routing
│   ├── _app.tsx       # Global app wrapper
│   ├── _document.tsx  # HTML document structure
│   ├── index.tsx      # Ana sayfa
│   └── api/           # API routes (kullanılmıyor)
├── public/            # Static assets
│   ├── tr.png         # Türk bayrağı
│   ├── usa.png        # ABD bayrağı
│   ├── logo.png       # Logo
│   └── ...
├── styles/            # CSS dosyaları
│   ├── globals.css    # Global styles
│   └── Home.module.css
└── package.json       # Dependencies
```

## ⚙️ Kurulum

### 1. Dependencies
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```

Frontend http://localhost:3000 adresinde çalışır.

### 3. Production Build
```bash
npm run build
npm start
```

## 🎨 Design System

### Color Palette
- **Primary**: Yellow (#EAB308, #FDE047)
- **Background**: Dark gradients (#0F0F23, #1E1B3C)
- **Text**: Light colors (#F8FAFC, #E2E8F0)
- **Accents**: Blue (#3B82F6, #1D4ED8)

### Typography
- **Heading**: 'Orbitron' (Futuristic feel)
- **Body**: System fonts (Inter, -apple-system)

### Components

#### Form Component (`components/form.tsx`)
Ana kullanıcı arayüzü:
- **Language Selector**: 🇹🇷/🇺🇸 bayrak butonları
- **Platform Selector**: Instagram, TikTok, YouTube, Twitter
- **Tone Selector**: 6 farklı ton seçeneği
- **Keyword Input**: Anahtar kelime girişi
- **Generate Button**: AI içerik üretimi tetikleyici

#### Result Component (`components/result.tsx`)
Sonuç gösterim arayüzü:
- **Title Display**: Üretilen başlık
- **Description**: Formatlanmış açıklama
- **Keywords**: Tag formatında anahtar kelimeler
- **Copy Button**: Clipboard'a kopyalama

#### Vido Component (`components/vido.tsx`)
Ana container:
- State management
- API communication
- Loading states
- Error handling

## 🌟 UI Features

### Modern AI Aesthetics
- **Glassmorphism**: backdrop-blur effects
- **Floating Elements**: Animated background circles
- **Gradient Overlays**: Multi-layer backgrounds
- **Smooth Animations**: CSS transitions & transforms

### Interactive Elements
- **Hover Effects**: Scale & color transitions
- **Loading States**: Spinning animations
- **Button Feedback**: Active & focus states
- **Responsive Design**: Mobile-first approach

### Multilingual Support
İki dil için complete UI texts:

```typescript
const texts = {
  tr: {
    title: "Vido AI",
    subtitle: "Sosyal Medya İçerik Üretici",
    // ... 50+ text entries
  },
  en: {
    title: "Vido AI", 
    subtitle: "Social Media Content Generator",
    // ... 50+ text entries
  }
}
```

## 🔧 API Integration

### Backend Communication
```typescript
const response = await fetch('http://localhost:8000/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    keyword,
    platform,
    tone,
    language
  })
});
```

### Error Handling
- Network error catching
- User-friendly error messages
- Retry mechanisms
- Loading state management

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

### Mobile Optimizations
- Touch-friendly button sizes
- Optimized spacing
- Readable font sizes
- Swipe gestures ready

## 🎯 State Management

### Component State
```typescript
interface VidoState {
  keyword: string;
  platform: Platform;
  tone: Tone;
  language: Language;
  loading: boolean;
  result: GeneratedContent | null;
}
```

### Props Flow
```
Vido (container)
├── Form (input handling)
└── Result (output display)
```

## 🛠️ Development

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended config
- **Prettier**: Code formatting
- **Component Structure**: Functional components with hooks

### Custom Hooks (Gelecek)
```typescript
// Potential custom hooks
const useVidoGenerator = () => { ... }
const useClipboard = () => { ... }
const useLanguage = () => { ... }
```

## 🎨 Styling Architecture

### Tailwind Classes
Utility-first CSS approach:
```tsx
className="bg-gradient-to-br from-yellow-400/20 to-blue-600/20 
           backdrop-blur-sm border border-yellow-400/30 
           rounded-xl p-6 shadow-2xl hover:scale-105 
           transition-all duration-300"
```

### CSS Variables
```css
:root {
  --primary-yellow: #EAB308;
  --bg-dark: #0F0F23;
  --glass-bg: rgba(255, 255, 255, 0.05);
}
```

## 📦 Dependencies

### Core
- `next` - React framework
- `react` - UI library
- `typescript` - Type safety

### Styling
- `tailwindcss` - Utility CSS
- `@tailwindcss/forms` - Form styling

### Development
- `eslint` - Linting
- `eslint-config-next` - Next.js ESLint config

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Static Export
```bash
npm run build
npm run export
```

### Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🎯 Future Enhancements

### Planned Features
- [ ] Dark/Light mode toggle
- [ ] Content history
- [ ] Favorite templates
- [ ] Export options (PDF, TXT)
- [ ] Social sharing
- [ ] Analytics integration

### UI Improvements
- [ ] Advanced animations
- [ ] Keyboard shortcuts
- [ ] Accessibility improvements
- [ ] Progressive Web App (PWA)

## 🐛 Troubleshooting

### Common Issues

**1. API Connection Failed**
```
TypeError: Failed to fetch
```
**Çözüm**: Backend servisinin çalıştığından emin olun (localhost:8000).

**2. Build Errors**
```
Type error: Property 'X' does not exist
```
**Çözüm**: TypeScript type definitions kontrolü yapın.

**3. Styling Issues**
```
Tailwind classes not working
```
**Çözüm**: `npm run dev` restart, Tailwind config kontrolü.

## 📸 Screenshots

[UI screenshots buraya eklenecek]

---
💡 **Frontend development için sorularınız varsa documentation'a başvurun!**
