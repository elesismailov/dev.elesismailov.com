import { useRouter } from 'next/router';
import Head from 'next/head';

import index_data from "./index_data.json";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectsSection from '@/components/ProjectsSection';
import NoLocale from '@/components/NoLocale';

export default function ProjectsIndex() {

    const router = useRouter();
    const locale = router.locale;
    const data = index_data.locales[locale] || index_data.locales['en'];

    return (<>
        <Head>
            <title>My Projects</title>
            <meta name="description" lang={locale} content="Eles Ismailov Web Developer" />
        </Head>
        <Header data={data} />

        <main className='projects-page'>
            
            <h1>{ data.h1 }</h1>
            <div className="wrapper">
                <ProjectsSection data={data.projects}/>
            </div>
        </main>

        <Footer data={data} />

    </>)
}
