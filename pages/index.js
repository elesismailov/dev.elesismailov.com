
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NoLocale from '@/components/NoLocale';
import HireMe from '@/components/HireMe';
import BlogPostCard from '@/components/BlogPostCard';

import prisma from '@/lib/prisma';

import index_data from "./index_data.json";
import ProjectsSection from '@/components/ProjectsSection';

export default function Home({ posts }) {

    const router = useRouter();
    const locale = router.locale;
    const data = index_data.locales[locale] || index_data.locales['en'];

    if (locale) {
        return (
            <>
                <Head>
                    <title>Eles Ismailov</title>
                    <meta name="description" lang="en" content="Eles Ismailov Web Developer" />
                </Head>


                <Header data={data} />

                <main lang={locale} className='font-["Ubuntu"] pt-10 md:pt-0'>

                    <section className="hero-section">
                        <div className="wrapper wrapper wrapper max-w-screen-2xl mx-auto h-[95vh] flex items-center pl-7
                        sm:pl-20
                        md:pl-36
                        lg:pl-56">
                            <h1 className="text-7xl text-black font-[500] leading-snug
                                sm:text-8xl
                                md:text-9xl">
                                I am <span className='text-[#F23737]'>Eles</span>.<br />Create.<br />Build.
                            </h1>
                        </div>
                    </section>

                    <section className="testimonial
                        ">
                        <div className="wrapper
                            bg-black text-white max-w-2xl m-auto overflow-hidden py-10 px-7
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

                    <section className="recent-works mb-16">
                        <h2>Recent Works</h2>

                        <div className="wrapper">
                            <ProjectsSection data={recent_projects} />
                        </div>

                        <Link href="/projects" locale={locale} className=" text-red-500 border-red-500 border-2 p-3.5 px-7 rounded-lg font-medium block max-w-64 mx-auto text-center hover:text-white hover:bg-red-500 mb-12">View All Projects</Link>

                    </section>


                    <HireMe data={data.hire_me} />

                    <section className="blog-section max-w-screen-2xl
                         px-7 mx-auto my-10">
                        <h1 className='text-4xl text-center mb-6'>Dive into my thoughts</h1>
                        <p className="text-center font-thin mb-8">Yep, this is my blog. There is supposed to be to be something interesting...</p>
                        <ul className='posts-list  mb-12 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] justify-items-center gap-y-10 gap-x-5'>
                            {posts.map((post) => {
                                return <BlogPostCard key={post?.id} post={post} />
                            })}
                        </ul>
                        <Link href="/blog" locale={locale} className=" text-red-500 border-red-500 border-2 p-3.5 px-7 rounded-lg font-medium block max-w-64 mx-auto text-center hover:text-white hover:bg-red-500">See All Blog Posts</Link>
                    </section>

                </main>


                <Footer data={data} />
            </>
        )
    } else {
        return <NoLocale />
    }
}

export async function getStaticProps() {
    const posts = await prisma.post.findMany({
        where: {
            unlisted: false,
            // publishedAt: null,
        },
        take: 2,
        orderBy: { createdAt: 'desc' },
        include: { author: true },
    });

    return {
        props: { posts: JSON.parse(JSON.stringify(posts)) },   // Pass posts directly, Prisma returns plain objects
        revalidate: 1
    };
}

const recent_projects = [
    {
        "title": "B40.KG",
        "description": [
            "Multinational German-Kyrgyzstan Arbitrage Company.",
            "It was made to be scalable in the future. Instead of making it a static page, I made it a full-stack app.",
            "The back end is Next.js which tracks language locales(/ru, /en) and dynamically renders them."
        ],
        "preview": "/previews/preview-b40.png",
        "previewAltText": "B40 Web Page Screenshot",
        "link": "http://b40.kg/",
        "tags": ["Next.js", "TailwindCSS", "Multilanguage", "Domain Set Up", "Custom Emails", "Integrated Maps", "Contact Form"]

    },
    {
        "title": "Ink. Agency",
        "description": [
            "Email copywriting agency.",
            "Eveything was done from scratch.",
            "Including design, assests, and copy of the page. And of course the coding part.",
            "Contact Form was implemented by using Web3Forms service."
        ],
        "preview": "/previews/ink-agency-preview.jpeg",
        "previewAltText": "Ink. Agency Website preview",
        "link": "http://ink-agency.com/",
        "tags": ["Next.js", "TailwindCSS", "Domain Set Up", "Contact Form", "Responsive"]

    },
];