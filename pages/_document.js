import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="https://elesismailov.com/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
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
