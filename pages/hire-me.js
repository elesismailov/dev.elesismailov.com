
import { useRouter } from 'next/router';
import Head from 'next/head'


export default function Contact() {

  const router = useRouter();
  const locale = router.locale;

  if (locale) {
    return (
      <>
      <Head>
        <title>Hire Me</title>
        <meta name="description" lang={ locale } content="Eles Ismailov Web Developer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main lang= { locale }>
        Hire Me Page
      </main>
    </>
    )
  }
}