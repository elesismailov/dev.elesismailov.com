
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
				<meta name="description" lang={locale} content="Eles Ismailov Web Developer" />
			</Head>

			<Header data={data} />

			<main lang={locale}>

				<div className="hire-me-page-wrapper pt-20">
					<HireMe data={data} />
				</div>

			</main>

			<Footer data={data} />
	</>
	)
  }
}