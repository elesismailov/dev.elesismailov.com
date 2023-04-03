
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
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>


        <Header data={data} />

        <main lang={locale}>

          <section className="intro">
            <div className="wrapper">
              <h1 dangerouslySetInnerHTML={{ __html: data.h1_1 }}></h1>
            </div>
            <hr />
          </section>

          <section className="recent-works">
            <h2>{data.recent_works.h2}</h2>

            <ProjectsSection data={data.recent_works.projects} />

            <Link href="/projects" locale={locale} className="projects-cta">View All</Link>

            <hr className='works-seperator'/>
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

