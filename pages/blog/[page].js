// pages/blog/index.js
// import BlogPostCard from '@/components/BlogPostCard'; 
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import BlogPostCard from '@/components/BlogPostCard';
import Link from 'next/link';

import prisma from '@/lib/prisma';
import Head from 'next/head';

export default function BlogPage({ posts, totalPages, currentPage }) {  // Receive posts directly as props

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


            <ul className='posts-list mb-14 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] justify-items-center gap-y-10 gap-x-5'>
                {posts.map((post) => {
                    return <BlogPostCard key={post?.id} post={post} />
                })}
            </ul>

            <div className="pagination flex flex-wrap gap-x-1 gap-y-3 justify-center items-center space-x-4">
                <Link href={`/blog/${currentPage - 1}`} className={'rounded-md flex items-center justify-center bg-black text-white px-3 py-1 hover:opacity-80 ' + `${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}>
                    Previous
                </Link>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link key={page} href={`/blog/${page}`}
                        className={`rounded-md px-3 py-1 border inline-block ${page === currentPage
                            ? 'bg-red-500 border-red-500 text-white'
                            : 'bg-white border-gray-300'
                            }`}
                        >
                        {page}
                    </Link>
                ))}

                <Link href={`/blog/${currentPage + 1}`} className={'rounded-md flex items-center justify-center bg-black text-white px-3 py-1 hover:opacity-80 ' + `${currentPage === totalPages ? 'pointer-events-none inline-block opacity-50' : 'inline-block'}`}>
                    Next
                </Link>
            </div>


        </div>
        <Footer />
    </>);
}


// pages/blog/[page].js

export async function getStaticPaths() {
    const pageSize = 6; 

    const totalPosts = await prisma.post.count({
        where: { unlisted: false } 
    });

    const totalPages = Math.ceil(totalPosts / pageSize);

    const paths = Array.from({ length: totalPages }, (_, index) => ({
        params: { page: (index + 1).toString() },
    }));

    return {
        paths,
        fallback: false, 
    };
}


export async function getStaticProps({ params }) {
    const pageSize = 6; 

    const currentPage = parseInt(params?.page) || 1; 

    const skip = (currentPage - 1) * pageSize;

    const posts = await prisma.post.findMany({
        where: { unlisted: false },
        orderBy: { createdAt: 'desc' },
        skip: skip,
        take: pageSize,
    });
    // console.log(posts)

    const totalPosts = await prisma.post.count({
        where: { unlisted: false }
    });

    const totalPages = Math.ceil(totalPosts / pageSize);

    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts)), 
            totalPages,
            currentPage
        },
        revalidate: 1
    };
}
