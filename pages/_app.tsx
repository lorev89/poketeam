import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Navbar from '@/components/Navbar'
import favicon from "../assets/images/favicon.ico"

export default function App({ Component, pageProps }: AppProps) {
  return <>
  <Head>
        <title>PokeTeam - Team Create App</title>
        <link rel="icon" type="image/ico" href={favicon.src}/>
      </Head>
    <Navbar/>
    <Component {...pageProps} />
  </>
}
