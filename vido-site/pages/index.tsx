import Head from 'next/head'
import { Inter } from 'next/font/google'
import Vido from '@/components/vido'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Vido | AI</title>
        <meta name="description" content="Generate branding snippets for your product" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Generate branding snippets for your product. Enhance your brand with AI-powered solutions."/>
        <meta name="keywords" content="AI, branding, snippets, product, branding snippets, AI-powered solutions"/>
        <meta name="author" content="Yunus emre salcan"/>
        <link rel="icon" href="/beeicon.ico" />
      </Head>
       <Vido />
     
    </>
  )
}
