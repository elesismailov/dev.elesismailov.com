
import { useRouter } from 'next/router';
import Head from 'next/head'

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NoLocale from '@/components/NoLocale';
import HireMe from '@/components/HireMe';


import index_data from "./index_data.json";

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
            <h2>{data.recent_works_h2}</h2>
            <div className="section-wrapper">

              <ul className="projects">
                {data.projects.map((p, i) =>
                  <li key={i} className={"project project-" + (i + 1)}>

                    {!p.isInverted &&
                      <div className="preview">
                        <img src={p.preview_link} alt={p.preview_alt} />
                      </div>}

                    <a href={p.link} className="text-block">
                      <h3>{p.h}</h3>
                      <p>{p.p}</p>
                    </a>

                    {p.isInverted &&
                      <div className="preview">
                        <img src={p.preview_link} alt={p.preview_alt} />
                      </div>}

                  </li>)}
              </ul>


              {/* <div className="project">
              <div className="preview">
                <img src="/preview-2.png" alt="Scriptonite website screenshot" />
              </div>
              <div className="text-block">
                <h3>{ data.recent_works_h3_2 }</h3>
                <p>{ data.recent_works_p_2 }</p>
              </div> 
            </div> */}

            </div>

            <hr />
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

