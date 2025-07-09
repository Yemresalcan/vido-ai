import { useState } from 'react';
import Image from 'next/image';
import usaFlag from '../public/usa.png';
import trFlag from '../public/tr.png';
import { FormProps, Language, Platform, Tone, TextContent } from '../types';

  
const Form: React.FC<FormProps> = (props) => {
  // Çoklu dil metinleri
  const texts = {
    english: {
      promptLabel: "Tell me about your brand, and I'll generate sentences and keywords for you",
      placeholder: "☕ coffee, 🍕 pizza, 🎮 gaming...",
      platform: "Platform:",
      tone: "Tone:",
      generateButton: "🚀 Generate with AI",
      generatingButton: "AI Working...",
      charLimit: "Input must be less than",
      characters: "characters.",
      platforms: {
        instagram: "📱 Instagram",
        tiktok: "🎵 TikTok", 
        youtube: "📺 YouTube",
        twitter: "🐦 Twitter"
      },
      tones: {
        eglenceli: "🎉 Fun",
        profesyonel: "💼 Professional", 
        motivasyonel: "💪 Motivational",
        komik: "😄 Funny",
        ciddi: "🎯 Serious",
        samimi: "🤗 Friendly"
      }
    },
    turkish: {
      promptLabel: "Bana markanızın ne hakkında olduğunu söyleyin, ben de sizin için cümle ve anahtar kelimeler oluşturayım",
      placeholder: "☕ kahve, 🍕 pizza, 🎮 oyun...",
      platform: "Platform:",
      tone: "Ton:",
      generateButton: "🚀 AI ile Üret",
      generatingButton: "AI Çalışıyor...",
      charLimit: "Girdi",
      characters: "karakterden az olmalıdır.",
      platforms: {
        instagram: "📱 Instagram",
        tiktok: "🎵 TikTok",
        youtube: "📺 YouTube", 
        twitter: "🐦 Twitter"
      },
      tones: {
        eglenceli: "🎉 Eğlenceli",
        profesyonel: "💼 Profesyonel",
        motivasyonel: "💪 Motivasyonel", 
        komik: "😄 Komik",
        ciddi: "🎯 Ciddi",
        samimi: "🤗 Samimi"
      }
    }
  };

  const currentTexts = texts[props.language as keyof typeof texts] || texts.turkish;

  const isPromptValid = props.prompt.length < props.characterLimit;

  const updatePromptValue = (text: string) => {
    if (text.length <= props.characterLimit) {
      props.setPrompt(text);
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    props.setLanguage(newLanguage as Language);
  };

  const renderLanguageButton = (language: string, label: string, flagSrc: any) => (
    <button
      key={language}
      className={`relative overflow-hidden bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 p-2 rounded-lg text-xs transition-all duration-300 hover:scale-105 ${
        props.language === language 
          ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300 font-bold shadow-lg shadow-yellow-400/20' 
          : 'text-slate-300 hover:text-white'
      }`}
      onClick={() => handleLanguageChange(language)}
    >
      <div className="relative z-10 flex items-center justify-center space-x-2">
        <div className="relative w-5 h-3 rounded-sm overflow-hidden shadow-md">
          <Image
            src={flagSrc}
            alt={`${language} flag`}
            fill
            className="object-cover"
          />
        </div>
        <span className="font-medium">{label}</span>
      </div>
      {props.language !== language && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
      )}
      {props.language === language && (
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-yellow-500/20 to-yellow-400/10 rounded-lg"></div>
      )}
    </button>
  )
  
    let statusColor = "text-slate-500";
    let statusText = null;
    if (!isPromptValid) {
      statusColor = "text-red-400";
      statusText = `Input must be less than ${props.characterLimit} characters.`;
    }

    
  
        return (
      <>
     <div className="mb-6 text-slate-400">
          <p>{currentTexts.promptLabel}</p>
      </div>
      <div className="relative">
        <input
          className="w-full p-3 rounded-xl bg-slate-800/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 focus:shadow-lg focus:shadow-yellow-400/20 backdrop-blur-sm text-sm"
          type="text"
          placeholder={currentTexts.placeholder}
          value={props.prompt}
          onChange={(e) => updatePromptValue(e.currentTarget.value)}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      <div className={`flex justify-between my-2 mb-4 text-sm ${isPromptValid ? 'text-slate-500' : 'text-red-400'}`}>
        <div>{isPromptValid ? null : `${currentTexts.charLimit} ${props.characterLimit} ${currentTexts.characters}`}</div>
        <div>
          {props.prompt.length}/{props.characterLimit}
        </div>
      </div>
      
      {/* Platform Seçici */}
      <div className="mb-3">
        <label className="block text-slate-400 text-xs font-bold mb-2">{currentTexts.platform}</label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(currentTexts.platforms).map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={`p-2 rounded-lg text-xs border transition-all ${ 
                props.platform === value 
                  ? 'bg-yellow-500 text-white border-yellow-500' 
                  : 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600'
              }`}
              onClick={() => props.setPlatform(value as Platform)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Ton Seçici */}
      <div className="mb-4">
        <label className="block text-slate-400 text-xs font-bold mb-2">{currentTexts.tone}</label>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(currentTexts.tones).map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={`p-2 rounded-lg text-xs border transition-all ${
                props.tone === value 
                  ? 'bg-yellow-500 text-white border-yellow-500' 
                  : 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600'
              }`}
              onClick={() => props.setTone(value as Tone)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <button
        className={`relative overflow-hidden bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 disabled:opacity-50 w-full p-3 rounded-xl text-base font-bold text-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50 disabled:hover:scale-100 ${
          props.isLoading ? 'animate-pulse' : 'hover:from-yellow-300 hover:to-yellow-500'
        }`}
        onClick={props.onSubmit}
        disabled={props.isLoading || !isPromptValid}
      >
        <div className="relative z-10 flex items-center justify-center space-x-2">
          {props.isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
              <span>{currentTexts.generatingButton}</span>
            </>
          ) : (
            <>
              <span>{currentTexts.generateButton}</span>
            </>
          )}
        </div>
        {!props.isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
        )}
      </button>
      <div className="grid grid-cols-2 gap-3 mt-4">
        {renderLanguageButton('english', 'English', usaFlag)}
        {renderLanguageButton('turkish', 'Türkçe', trFlag)}
      </div>
    </>
  );
};

export default Form;