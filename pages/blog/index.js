// pages/blog/index.js
// import BlogPostCard from '@/components/BlogPostCard'; 
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import prisma from '@/lib/prisma';
import Head from 'next/head';
import Link from 'next/link';

export default function BlogPage({ posts }) {  // Receive posts directly as props

    return (<>
        <Header />
        <Head>
            <title>My Blog</title>
        </Head>
        <div className='               
            sm:py-8 sm:px-24
            md:py-10 md:px-28
            lg:px-36 min-h-screen mx-auto my-10'>
            <h1 className='text-4xl text-center mb-10'>My Blog</h1>
            <ul className='posts-list grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] justify-items-center gap-y-10 gap-x-5'>
                {posts.map((post) => {
                    return <PostCard post={post} />
                })}
            </ul>
        </div>
        <Footer />
    </>);
}

const PostCard = function ({ post }) {
    const formattedDate = new Date(post.createdAt).toLocaleString('en-US', { year: "numeric", month: "long", day: "numeric" });
    return (
        <li key={post?.id} className="flex flex-col mt-auto mr-0 mb-2 ml-0 max-w-[350px] w-full h-full rounded-md shadow-md overflow-hidden">
            <a className='block' href={'/blog/posts/' + post.slug} tabIndex={-1}>
                <div className="mb-5 block w-full max-h-52 h-52 bg-black overflow-hidden">
                    <div className="w-full h-full block">
                        {!!post.preview ?
                            <img className="max-w-full h-full" src={post.preview} alt={post.title + " preview"} />
                            :
                            <div className=""></div>
                            // <img className="max-w-full h-full" src="/redacted.png" alt="A black background with a word redactepost." />
                        }
                    </div>
                </div>
            </a>
            <div className="flex flex-col justify-between h-full py-0 px-4 pb-5">
                <h2 className='title text-xl text-black mb-2'><a href={'/blog/posts/' + post.slug}>{post.title}</a></h2>
                {/* <hr className="my-4 mx-[-1.5rem]"/> */}
                <time className="text-sm text-gray-500" dateTime={post.createdAt}>{formattedDate}</time>
            </div>
        </li>
        // <li key={post.id} className='mb-10 bg-black rounded-md p-5 text-white'>
        //     <h2 className='text-2xl mb-3 hover:text-red-500' ><Link href={"/blog/posts/" + post.slug}>{post.title}</Link></h2>
        //     <time className='italic text-gray-400' dateTime={formattedDate}>{formattedDate}</time>
        // </li>
    );
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
