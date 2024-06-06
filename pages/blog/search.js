// pages/search.js

import { useRouter } from 'next/router';
import { useState } from 'react';

import BlogPostCard from '@/components/BlogPostCard';
import prisma from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SearchPage({ posts, q }) {
    const [searchQuery, setSearchQuery] = useState(q || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchQuery) {
            return;
        }
        window.location.href = `/blog/search?q=${searchQuery}`;
    };

    return (<>
        <Header />
        <div className='
            py-10 px-7       
            sm:py-16 sm:px-16
            md:py-10 md:px-20
            lg:px-32 min-h-screen mx-auto my-10'>
            <h1 className="text-3xl mb-4 text-center md:text-left">Search results</h1>

            <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-3 mb-10 w-full md:w-72 border-b-[1px] border-black focus focus:border-b-2 px-2 py-1">
                    <input
                        className="w-full text-lg focus:outline-none "
                        type="text"
                        name="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search posts..."
                    />
                    <button htmlFor="search" name="search" onClick={handleSubmit} className="">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>

            </form>

            <ul className='posts-list mb-14 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] justify-items-center gap-y-10 gap-x-5'>
                {posts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                ))}
            </ul>
            {!posts.length && <p className='text-center'>No posts found</p>}
        </div>
        <Footer />
    </>);
}

export async function getServerSideProps({ query }) {
    const { q } = query;

    //   if (!searchQuery) {
    //     return {
    //       redirect: {
    //         destination: '/blog',
    //         permanent: false,
    //       },
    //     };
    //   }

    const posts = await prisma.post.findMany({
        where: {
            OR: [
                { title: { contains: q, mode: 'insensitive' } },
                { content: { contains: q, mode: 'insensitive' } },
            ],
        },
    });

    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts)),
            q
        },
    };
}
