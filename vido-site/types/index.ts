// API Response Types
export interface ApiResponse {
  snippet: string;
  keywords: string[];
}

// Component Props Types
export interface FormProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  isLoading: boolean;
  characterLimit: number;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  platform: Platform;
  setPlatform: React.Dispatch<React.SetStateAction<Platform>>;
  tone: Tone;
  setTone: React.Dispatch<React.SetStateAction<Tone>>;
}

export interface ResultsProps {
  prompt: string;
  snippet: string;
  keywords: string[];
  onBack: () => void;
  language: Language;
}

// Enum Types
export type Platform = 'instagram' | 'tiktok' | 'youtube' | 'twitter';
export type Tone = 'eglenceli' | 'profesyonel' | 'motivasyonel' | 'komik' | 'ciddi' | 'samimi';
export type Language = 'turkish' | 'english';

// Text Content Types
export interface TextContent {
  english: {
    [key: string]: string | { [key: string]: string };
  };
  turkish: {
    [key: string]: string | { [key: string]: string };
  };
}

// API Error Type
export interface ApiError {
  detail: string;
  status: number;
}

// Environment Variables
export interface EnvVars {
  NEXT_PUBLIC_API_URL?: string;
  NODE_ENV: 'development' | 'production' | 'test';
} 