import React from "react";
import Form from "./form";
import Results from "./result";
import Image from "next/image";
import logo from "../public/logo.png";
import { SocialIcon } from 'react-social-icons';
import { Platform, Tone, Language, ApiResponse, TextContent } from '../types';


const Vido: React.FC = () => { 
    const CHAR_LIMIT: number = 1000;
    const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_URL || "https://vido-ai.fly.dev"
    const ENDPOINT: string = `${API_BASE_URL}/generate_snippet_and_keywords`
    const[prompt, setPrompt] = React.useState("")
    const[snippet, setSnippet] = React.useState("")
    const [keywords, setKeywords] = React.useState([])
    const [hasResult, setHasResult] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [platform, setPlatform] = React.useState<Platform>("instagram")
    const [tone, setTone] = React.useState<Tone>("eglenceli")
    const [language, setLanguage] = React.useState<Language>("turkish")
    const [error, setError] = React.useState("")
   
    const onSubmit=()=>{
        console.log("SubmitEvent:" + prompt)
        setIsLoading(true)
        setError("")
        
        fetch(`${ENDPOINT}?prompt=${prompt}&platform=${platform}&tone=${tone}&language=${language}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(onResult)
            .catch((err) => {
                console.error("API Error:", err);
                setError(language === "english" ? 
                    "Connection error. Please check if the backend is running." : 
                    "Bağlantı hatası. Lütfen backend'in çalıştığını kontrol edin.");
                setIsLoading(false);
            });
    };

    const onResult = (data:any) => {
        setSnippet(data.snippet)
        setKeywords(data.keywords);
        setHasResult(true);
        setIsLoading(false)
 
    };
    const onReset = () => {
        setPrompt("")
        setHasResult(false);
        setIsLoading(false)
        setError("")
    };

    // Çoklu dil metinleri
    const headerTexts = {
        english: {
            title: "Vido",
            subtitle: "🤖 Your AI Video Assistant",
            poweredBy: "⚡ Powered by AI • 🚀 Made with Yemresalcan"
        },
        turkish: {
            title: "Vido", 
            subtitle: "🤖 Sizin AI Video Yardımcınız",
            poweredBy: "⚡ Powered by AI • 🚀 Made with  Yemresalcan"
        }
    };

    const currentHeaderTexts = headerTexts[language as keyof typeof headerTexts] || headerTexts.turkish;



    let displayedElement = null;
    if(hasResult){
        displayedElement = (
        <Results 
        snippet={snippet} 
        keywords={keywords} 
        onBack={onReset} 
        prompt={prompt}
        language={language}/>   
        )
    }else {
        displayedElement= (
        <Form prompt={prompt} 
        setPrompt={setPrompt} 
        onSubmit={onSubmit} 
        isLoading={isLoading} 
        setLanguage={setLanguage}
        language={language}   
        platform={platform}
        setPlatform={setPlatform}
        tone={tone}
        setTone={setTone}
        characterLimit={CHAR_LIMIT}/>
        
        )
    }


    
   
    return (
        <>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex relative overflow-hidden">
            {/* AI Background Effects */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-16 left-16 w-56 h-56 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-32 right-16 w-56 h-56 bg-yellow-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                <div className="absolute -bottom-24 left-1/2 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
            </div>
            
            <div className="max-w-md m-auto p-3 relative z-10">
                <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-2xl text-white border border-slate-700/50 shadow-2xl">
                 <div className="text-center my-6">
                 <div className="relative inline-block">
                     <Image src={logo} alt="logo" width={96} height={96} className="mr-2 inline drop-shadow-lg"  />
                     <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full animate-ping opacity-75"></div>
                     <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full"></div>
                 </div>
                 <h1 className="font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 animate-pulse">{currentHeaderTexts.title}</h1>
                 <div className="font-bold text-transparent text-sm bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 mt-2">{currentHeaderTexts.subtitle}</div>
                 <div className="flex justify-center items-center mt-2 space-x-1">
                     <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce"></div>
                     <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce delay-100"></div>
                     <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce delay-200"></div>
                 </div>
                 </div>

                {displayedElement}
                
                {error && (
                    <div className="mt-4 p-3 bg-red-900/50 border border-red-500/50 rounded-xl text-red-300 text-sm text-center backdrop-blur-sm">
                        {error}
                    </div>
                )}
                
                <div className="text-center mt-4">
                    <div className="flex justify-center space-x-2 mb-3">
                        <SocialIcon url="https://twitter.com/yesdev_exe" network="twitter" fgColor="#fef08a" className="transition-transform hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/50" style={{height: 32, width: 32}} />
                        <SocialIcon url="https://github.com/Yemresalcan" network="github" fgColor="#fef08a" className="transition-transform hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/50" style={{height: 32, width: 32}}/>
                        <SocialIcon url="https://www.youtube.com/channel/UCeRpo6-m4ieownGFGaDNFiw" network="youtube" fgColor="#fef08a" className="transition-transform hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/50" style={{height: 32, width: 32}}/>
                        <SocialIcon url="https://www.instagram.com/yemresalcan" network="instagram" fgColor="#fef08a" className="transition-transform hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/50" style={{height: 32, width: 32}}/>
                        <SocialIcon url="https://linkedin.com/in/yunusemresalcan" network="linkedin" fgColor="#fef08a" className="transition-transform hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/50" style={{height: 32, width: 32}}/>
                    </div>
                    <div className="text-xs text-slate-400">
                        {currentHeaderTexts.poweredBy}
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Vido;