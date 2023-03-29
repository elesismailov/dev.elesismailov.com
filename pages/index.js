
import { useRouter } from 'next/router';
import Head from 'next/head'

import page_data from "./page_data.json";

export default function Home() {

  const router = useRouter();
  const locale = router.locale;
  const d = page_data.locales[locale] || page_data.locales['en'];

  if (locale) {
    return (
      <>
      <Head>
        <title>Eles Ismailov Web Developer</title>
        <meta name="description" lang="en" content="Eles Ismailov Web Developer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main lang={ locale }>
        <section className="intro">
          <h1>{ d.h1_1 }</h1>
        </section>
      </main>
    </>
    )
  } else {
    <Head>
      <title>Sorry, no luck...</title>
      <meta name="description" lang="en" content="Eles Ismailov Web Developer" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    return (
      <div className="not-found">
        Not Available For Your Region yet.
      </div>
    )
  }
}

