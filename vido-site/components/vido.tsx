import React from "react";
import Form from "./form";
import Results from "./result";
import Image from "next/image";
import logo from "../public/logo.png";
import { SocialIcon } from 'react-social-icons';


const Vido: React.FC = () => { 
    const CHAR_LIMIT: number = 1000;
    const ENDPOINT: string = "http://127.0.0.1:8008/generate_snippet_and_keywords"
    const[prompt, setPrompt] = React.useState("")
    const[snippet, setSnippet] = React.useState("")
    const [keywords, setKeywords] = React.useState([])
    const [hasResult, setHasResult] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
   
    const onSubmit=()=>{
        console.log("SubmitEvent:" + prompt)
        setIsLoading(true)
        fetch(`${ENDPOINT}?prompt=${prompt}`).then((res) => 
        res.json()).then(onResult)
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
 
    };



    let displayedElement = null;
    if(hasResult){
        displayedElement = (
        <Results 
        snippet={snippet} 
        keywords={keywords} 
        onBack={onReset} 
        prompt={prompt}/>   
        )
    }else {
        displayedElement= (
        <Form prompt={prompt} 
        setPrompt={setPrompt} 
        onSubmit={onSubmit} 
        isLoading={isLoading} 
        setLanguage={setPrompt}
        language={prompt}   
        
        characterLimit={CHAR_LIMIT}/>
        
        )
    }


    
   
    return (
        <>
        <div className="h-screen flex">
            <div className="max-w-md m-auto p-2">
                <div className="bg-slate-900 p-6 rounded-md text-white">
                 <div className="text-center my-6">
                 <Image src={logo} alt="logo" width={120} height={120} className="mr-2 inline"  />
                 <h1 className="font-extrabold text-transparent text-6xl bg-clip-text  bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 ">Vido</h1>
                 <div className="font-extrabold text-transparent text-sm bg-clip-text  bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200">Sizin AI Video Yardımcınız  </div>
                 </div>

                {displayedElement}
            </div>
            <div className="text-center mt-2">
            <SocialIcon  url="https://twitter.com/yesdev_exe"         network="twitter" fgColor="#fef08a" className="ml-1" />
            <SocialIcon  url="https://github.com/Yemresalcan"         network="github" fgColor="#fef08a"className="ml-1"/>
            <SocialIcon  url="https://www.youtube.com/channel/UCeRpo6-m4ieownGFGaDNFiw"         network="youtube" fgColor="#fef08a"className="ml-1"/>
            <SocialIcon  url="https://www.instagram.com/yemresalcan"        network="instagram" fgColor="#fef08a"className="ml-1"/>
            <SocialIcon  url="https://linkedin.com/in/yunusemresalcan"        network="linkedin" fgColor="#fef08a"className="ml-1"/>
            </div>

        </div>

     </div>
        



        </>
    )
}
export default Vido;