
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NoLocale from '@/components/NoLocale';
import HireMe from '@/components/HireMe';


import index_data from "./index_data.json";
import ProjectsSection from '@/components/ProjectsSection';

export default function Home() {

    const router = useRouter();
    const locale = router.locale;
    const data = index_data.locales[locale] || index_data.locales['en'];

    if (locale) {
        return (
            <>
                <Head>
                    <title>Eles Ismailov Web Developer</title>
                    <meta name="description" lang="en" content="Eles Ismailov Web Developer" />
                </Head>


                <Header data={data} />

                <main lang={locale} className=''>

                    <section className="hero-section">
                        <div className="wrapper wrapper wrapper max-w-screen-2xl mx-auto h-[95vh] flex items-center pl-56">
                            <h1 className="text-9xl font-normal leading-none">
                                I am <span className='text-[#F23737]'>Eles</span>.<br/>Create.<br/>Build.
                            </h1>
                        </div>
                    </section>

                    

                    <section className="recent-works">
                        <h2>{data.recent_works.h2}</h2>

                        <div className="wrapper">
                            <ProjectsSection data={data.recent_works.projects} />
                        </div>

                        <Link href="/projects" locale={locale} className="projects-cta">{data.recent_works.cta}</Link>

                        <hr className='works-seperator' />
                    </section>


                    <HireMe data={data.hire_me} />

                </main>


                <Footer data={data} />
            </>
        )
    } else {
        return <NoLocale />
    }
}

