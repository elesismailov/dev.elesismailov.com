// pages/blog/index.js
// import BlogPostCard from '@/components/BlogPostCard'; 
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import BlogPostCard from '@/components/BlogPostCard';

import prisma from '@/lib/prisma';
import Head from 'next/head';

export default function BlogPage({ posts }) {  // Receive posts directly as props

    return (<>
        <Header />
        <Head>
            <title>My Blog</title>
        </Head>
        <div className='
            py-10            
            sm:py-16 sm:px-24
            md:py-10 md:px-28
            lg:px-36 min-h-screen mx-auto my-10'>
            <h1 className='text-4xl text-center mb-10'>My Blog</h1>
            <ul className='posts-list grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] justify-items-center gap-y-10 gap-x-5'>
                {posts.map((post) => {
                    return <BlogPostCard post={post} />
                })}
            </ul>
        </div>
        <Footer />
    </>);
}


export async function getStaticProps() {
    const posts = await prisma.post.findMany({
        where: {
            unlisted: false,
            // publishedAt: null,
        },
        orderBy: { createdAt: 'desc' },
        include: { author: true },
    });

    return {
        props: { posts: JSON.parse(JSON.stringify(posts)) },   // Pass posts directly, Prisma returns plain objects
        revalidate: 1
    };
}
