
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NoLocale from '@/components/NoLocale';
import HireMe from '@/components/HireMe';
import BlogPostCard from '@/components/BlogPostCard';


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

                <main lang={locale} className='font-["Ubuntu"]'>

                    <section className="hero-section">
                        <div className="wrapper wrapper wrapper max-w-screen-2xl mx-auto h-[95vh] flex items-center pl-7
                        sm:pl-20
                        md:pl-56">
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

                    <section className="blog-section
                        sm:py-8 sm:px-24
                        md:py-10 md:px-28
                        lg:px-36 mx-auto my-10">
                        <h1 className='text-4xl text-center mb-6'>Dive into my thoughts</h1>
                        <p className="text-center font-thin mb-8">Yep, this is my blog. There is supposed to be to be something interesting...</p>
                        <ul className='posts-list  mb-12 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] justify-items-center gap-y-10 gap-x-5'>
                            {posts.map((post) => {
                                return <BlogPostCard post={post} />
                            })}
                        </ul>
                        <Link href="/projects" locale={locale} className=" text-red-500 border-red-500 border-2 p-3.5 px-7 rounded-lg font-medium block max-w-64 mx-auto text-center hover:text-white hover:bg-red-500">See All Blog Posts</Link>
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
    {
        "title": "Luxe Salon Agency",
        "description": [
            "Sales & Marketing Agency targeting beauty salons.",
            "Work inlcluded: desiging assets and the website, coding & deploying the website.",
            "One of my favorite parts is the color palette of the page."
        ],
        "preview": "/previews/luxe-salon-preview.png",
        "previewAltText": "Scriptonite Web Page Screenshot",
        "link": "https://luxe-salon-website-56475796.vercel.app/",
        "tags": ["Next.js", "TailwindCSS", "Domain Set Up", "Responsive"]
    }
];