
import { useRouter } from 'next/router';
import Head from 'next/head'

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import about_data from "./about_data.json";
import NoLocale from '@/components/NoLocale';

export default function AboutMe() {

    const router = useRouter();
    const locale = router.locale;
    const data = about_data.locales[locale] || about_data.locales['en'];

    if (locale) {
        return (<>
            <Head>
                <title>About Me</title>
            </Head>
            <Header data={data} />
            <div className="wrapper">
                <h1>{ data.h1 }</h1>
            </div>
            <Footer data={data} />
        </>
        )
    } else {
        return <NoLocale />
      }
}