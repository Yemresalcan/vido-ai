import React, { useState } from 'react';

interface ResultsProps {
  prompt: string;
  snippet: string;
  keywords: string[];
  onBack: any;
}

const Results: React.FC<ResultsProps> = (props) => {
  const [copiedKeywords, setCopiedKeywords] = useState<boolean>(false);

  const copyAllKeywords = () => {
    const allKeywords = props.keywords.map(keyword => `#${keyword}`).join(' ');
    navigator.clipboard.writeText(allKeywords);
    setCopiedKeywords(true);
  };

  const keywordElements = props.keywords.map((keyword, index) => (
    <div
      key={index}
      className={`bg-yellow-200 p-1 text-yellow-700 px-2 text-sm rounded-md ${
        copiedKeywords ? 'opacity-50' : 'cursor-pointer'
      }`}
    >
      #{keyword}
    </div>
  ));

  const resultSection = (label: string, body: any) => {
    return (
      <div className="bg-slate-700 p-4 my-3 rounded-md">
        <div className="text-slate-400 text-sm font-bold mb-4">{label}</div>
        <div>{body}</div>
      </div>
    );
  };

  return (
    <>
      <div className="mb-6">
        {resultSection(
          "Girdiğiniz Kelime",
          <div className="text-lg font-bold">{props.prompt}</div>
        )}
        {resultSection("Oluşturulan Cümle", props.snippet)}
        {resultSection("Kelimeler", (
          <div className="flex flex-wrap gap-2">{keywordElements}</div>
        ))}
      </div>
      <button
        className={`mt-1 bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-1 rounded-md ${copiedKeywords ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={copyAllKeywords}
        disabled={copiedKeywords}
      >
        Tümünü Kopyala
      </button>
        <div className="text-sm text-slate-400 mt-2">
            {copiedKeywords ? 'Kopyalandı!' : ''}
            </div>
      <button
        className="bg-gradient-to-r from-yellow-400 
          to-yellow-500 disabled:opacity-50 w-full p-2 rounded-md text-lg"
        onClick={props.onBack}
      >
        Geri
      </button>
   
    </>
  );
};

export default Results;
