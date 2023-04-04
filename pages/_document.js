import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="https://elesismailov.com/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <!-- Google tag (gtag.js) --> */}
        <Script id="google-tag" strategy="afterInteractive" async src="https://www.googletagmanager.com/gtag/js?id=G-WVF6W872VG"></Script>
        <Script id="google-tag-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-WVF6W872VG');
            console.log('Google Analytics plugged in...')
          `}
        </Script>
      </Head>
      <body>
        <div id="overflow-wrapper">
          <Main />  
          <NextScript />
        </div>
      </body>
    </Html>
  )
}
