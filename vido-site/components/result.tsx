import React, { useState } from 'react';
import { ResultsProps, Language, TextContent } from '../types';

const Results: React.FC<ResultsProps> = (props) => {
  const [copiedKeywords, setCopiedKeywords] = useState<boolean>(false);

  // Çoklu dil metinleri
  const texts = {
    english: {
      inputLabel: "Your Input",
      generatedSentence: "Generated Sentence", 
      keywords: "Keywords",
      copyAll: "📋 Copy All",
      copied: "✅ Copied!",
      backButton: "↩️ Go Back"
    },
    turkish: {
      inputLabel: "Girdiğiniz Kelime",
      generatedSentence: "Oluşturulan Cümle",
      keywords: "Kelimeler", 
      copyAll: "📋 Tümünü Kopyala",
      copied: "✅ Kopyalandı!",
      backButton: "↩️ Geri Dön"
    }
  };

  const currentTexts = texts[props.language as keyof typeof texts] || texts.turkish;

  const copyAllKeywords = () => {
    const allKeywords = props.keywords.map(keyword => `#${keyword}`).join(' ');
    navigator.clipboard.writeText(allKeywords);
    setCopiedKeywords(true);
  };

  const keywordElements = props.keywords.map((keyword, index) => (
    <div
      key={index}
      className={`relative bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 border border-yellow-400/30 backdrop-blur-sm p-2 text-yellow-300 px-3 text-xs rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/30 hover:border-yellow-400/60 ${
        copiedKeywords ? 'opacity-50' : 'cursor-pointer hover:from-yellow-400/30 hover:to-yellow-500/30'
      }`}
      onClick={() => !copiedKeywords && navigator.clipboard.writeText(`#${keyword}`)}
    >
      <span className="relative z-10 flex items-center space-x-1">
        <span className="text-yellow-400">#</span>
        <span>{keyword}</span>
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  ));

  const resultSection = (label: string, body: any) => {
    return (
      <div className="bg-gradient-to-br from-slate-700/80 to-slate-800/80 backdrop-blur-sm p-4 my-3 rounded-xl border border-slate-600/50 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="text-yellow-400 text-xs font-bold mb-3 flex items-center space-x-2">
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          <span>{label}</span>
        </div>
        <div className="text-slate-100 leading-relaxed text-sm">{body}</div>
      </div>
    );
  };

  return (
    <>
      <div className="mb-6">
        {resultSection(
          currentTexts.inputLabel,
          <div className="text-lg font-bold">{props.prompt}</div>
        )}
        {resultSection(currentTexts.generatedSentence, (
          <div className="relative bg-gradient-to-br from-slate-600/50 to-slate-700/50 p-4 rounded-lg border border-yellow-400/20 backdrop-blur-sm">
            <div className="text-slate-100 leading-relaxed text-base whitespace-pre-wrap break-words mb-3">
              {props.snippet}
            </div>
            <button 
              className="absolute top-2 right-2 p-1 bg-yellow-400/20 hover:bg-yellow-400/30 rounded-lg transition-all duration-200 group"
              onClick={() => navigator.clipboard.writeText(props.snippet)}
            >
              <div className="w-3 h-3 text-yellow-400 group-hover:scale-110 transition-transform">📋</div>
            </button>
          </div>
        ))}
        {resultSection(currentTexts.keywords, (
          <div className="flex flex-wrap gap-2">{keywordElements}</div>
        ))}
      </div>
      <div className="space-y-3 mt-4">
        <button
          className={`relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-slate-900 font-bold py-2 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50 text-sm ${
            copiedKeywords ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={copyAllKeywords}
          disabled={copiedKeywords}
        >
          <div className="relative z-10 flex items-center justify-center space-x-2">
            <span>{copiedKeywords ? currentTexts.copied : currentTexts.copyAll}</span>
          </div>
          {!copiedKeywords && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
          )}
        </button>
        
        <button
          className="relative overflow-hidden bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white font-bold py-2 px-4 rounded-xl w-full transition-all duration-300 hover:scale-105 hover:shadow-lg border border-slate-500 text-sm"
          onClick={props.onBack}
        >
          <div className="relative z-10 flex items-center justify-center space-x-2">
            <span>{currentTexts.backButton}</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
        </button>
      </div>
   
    </>
  );
};

export default Results;
