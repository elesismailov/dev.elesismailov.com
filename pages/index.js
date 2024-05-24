
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
                        <div className="wrapper wrapper wrapper max-w-screen-2xl mx-auto h-[95vh] flex items-center pl-7
                        sm:pl-20
                        md:pl-56">
                            <h1 className="text-7xl font-normal leading-snug
                                sm:text-8xl
                                md:text-9xl">
                                I am <span className='text-[#F23737]'>Eles</span>.<br/>Create.<br/>Build.
                            </h1>
                        </div>
                    </section>

                    <section className="testimonial
                        ">
                        <div className="wrapper
                            bg-gray-800 text-white max-w-2xl m-auto overflow-hidden py-10 px-7
                            sm:rounded-xl sm:py-8 sm:px-9
                            ">
                                <div className="header-wrapper
                                    flex items-center gap-4 mb-4">
                                    <div className="profile-pic
                                        w-14 h-14 bg-white rounded-full overflow-hidden border-red-500 border-2 ">
                                        <img src="/mohamad-profile-picture.jpeg" alt="" className="" />
                                    </div>
                                    <div className="name text-xl">
                                        <p className="">Mohamad Fakhro</p>
                                    </div>
                                </div>
                                <p className='text-lg text-center mb-3'>
                                    "He recently created a stunning website for my agency, exceeding all our expectations. Eles was professional, attentive to our needs, and delivered a user-friendly, visually appealing site that perfectly represents our brand. His expertise and creativity have been evident throughout the process, making collaboration easy and enjoyable. We've received numerous compliments on the design and functionality of our new site.
                                </p>
                                <p className='text-lg text-center font-bold italic'>
                                    If you need a talented web developer, Eles is the person to call."
                                </p>
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

