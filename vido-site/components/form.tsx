import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';







interface FormProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  isLoading: boolean;
  characterLimit: number;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

  
const Form: React.FC<FormProps> = (props) => {
  const promptInputLabel =
    props.language === 'english'
      ? "Tell me about your brand, and I'll generate sentences and keywords for you"
      : 'Bana markanızın ne hakkında olduğunu söyleyin, ben de sizin için cümle ve anahtar kelimeler oluşturayım';

  const isPromptValid = props.prompt.length < props.characterLimit;

  const updatePromptValue = (text: string) => {
    if (text.length <= props.characterLimit) {
      props.setPrompt(text);
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    props.setLanguage(newLanguage);
  };

  const renderLanguageButton = (language: string, label: string) => (
    <button
      key={language}
      className={`bg-unset p-2 rounded-md text-sm  ${props.language === language ? 'font-bold' : ''}`}
      onClick={() => handleLanguageChange(language)}
    >
      <FontAwesomeIcon icon={faFlag} className="mr-4 " />
      {label}
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
          <p>{promptInputLabel}</p>
      </div>
      <input
        className="p-2 w-full rounded-md focus:outline-yellow-400 focus:outline text-yellow-700"
        type="text"
        placeholder="coffee"
        value={props.prompt}
        onChange={(e) => updatePromptValue(e.currentTarget.value)}
      />
       <div className={`flex justify-between my-2 mb-6 text-sm ${isPromptValid ? 'text-slate-500' : 'text-red-400'}`}>
        <div>{isPromptValid ? null : `Input must be less than ${props.characterLimit} characters.`}</div>
        <div>
          {props.prompt.length}/{props.characterLimit}
        </div>
      </div>
      <button
        className="bg-gradient-to-r from-yellow-400 to-yellow-500 disabled:opacity-50 w-full p-2 rounded-md text-lg"
        onClick={props.onSubmit}
        disabled={props.isLoading || !isPromptValid}
      >
        Üret
      </button>
      <div className="flex">
        {renderLanguageButton('english', 'English')}
        {renderLanguageButton('turkish', 'Türkçe')}
      </div>
    </>
  );
};

export default Form;