import { useRouter } from 'next/router';
import Head from 'next/head';

import {styles} from "@/styles/Projects.module.scss";

import index_data from "./index_data.json";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NoLocale from '@/components/NoLocale';

export default function ProjectsIndex() {

    const router = useRouter();
    const locale = router.locale;
    const data = index_data.locales[locale] || index_data.locales['en'];

    return (<>
        <Head>
            <title>Hire Me</title>
            <meta name="description" lang={locale} content="Eles Ismailov Web Developer" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header data={data} />

        <main className={styles}>
            
            <h1>{ data.h1 }</h1>

            <ul className="projects">
                {
                    data.projects.map((p, i) => <li className='project'>
                        {p.title}
                    </li>)
                }
            </ul>
        </main>

        <Footer data={data} />

    </>)
}