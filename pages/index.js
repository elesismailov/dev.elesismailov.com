
import { useRouter } from 'next/router';
import Head from 'next/head'


export default function Home() {

  const router = useRouter();
  const locale = router.locale;

  if (locale) {
    return (
      <>
      <Head>
        <title>Eles Ismailov Web Developer</title>
        <meta name="description" lang={ locale } content="Eles Ismailov Web Developer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main lang= { locale }>
        This is where the fun begins.
      </main>
    </>
    )
  } else {
    return <>Not Available For Your Region yet.</>
  }
}

