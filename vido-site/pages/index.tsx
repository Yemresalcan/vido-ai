import Head from 'next/head';
import { Inter } from 'next/font/google';
import Vido from '@/components/vido';
import Marquee from "react-fast-marquee";
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [showText, setShowText] = useState(true);
  const marqueeLoops = 2; // Number of loops you want to complete

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowText(false);
    }, marqueeLoops * 3000 * 2);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Vido | AI</title>
        <meta name="description" content="Generate branding snippets for your product" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Generate branding snippets for your product. Enhance your brand with AI-powered solutions." />
        <meta name="keywords" content="AI, branding, snippets, product, branding snippets, AI-powered solutions" />
        <meta name="author" content="Yunus emre salcan" />
        <link rel="icon" href="/beeicon.ico" />
      </Head>
      <Marquee speed={150} loop={marqueeLoops}>
        {showText && <a href='' className="text-2xl text-center text-yellow-500  bg-slate-900 mt-2 p-2 rounded-md"
        >Bu site toplam 2 ay gibi bir sürede tamamlanmıştır ! - This site has been completed in a total of about 2 months !.
        </a>}
      </Marquee>
      <Vido />
    </>
  );
}
