import '@/styles/globals.scss'

import Head from 'next/head'
import { SessionProvider } from 'next-auth/react';
import { Analytics } from "@vercel/analytics/react"

export default function App({ Component, pageProps }) {
  return (
    <>
      <SessionProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </SessionProvider>
      <Analytics />

    </>
  )
}
