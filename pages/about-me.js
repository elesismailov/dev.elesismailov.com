
import { useRouter } from 'next/router';
import Head from 'next/head'

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import page_data from "./page_data.json";
import NoLocale from '@/components/NoLocale';

export default function AboutMe() {

    const router = useRouter();
    const locale = router.locale;
    const d = page_data.locales[locale] || page_data.locales['en'];

    if (locale) {
        return (<>
            <Head>
                <title>About Me</title>
            </Head>
            <Header d={d} />
            <div className="wrapper">
                <h1>{ d.about_me.h1 }</h1>
            </div>
            <Footer d={d} />
        </>
        )
    } else {
        return <NoLocale />
      }
}