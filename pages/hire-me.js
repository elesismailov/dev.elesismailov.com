
import { useRouter } from 'next/router';
import Head from 'next/head'
import HireMe from '@/components/HireMe';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import hire_data from './hire_data.json';


export default function Contact() {

  const router = useRouter();
  const locale = router.locale;
  const data = hire_data.locales[locale] || hire_data.locales['en'];


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

		<Header data={data} />

		<HireMe data={data} />

		<Footer data={data} />
	  </main>
	</>
	)
  }
}