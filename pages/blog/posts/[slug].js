// pages/blog/posts/[slug].js
import { notFound } from 'next/navigation' // new way to not found if using app folder
import prisma from '@/lib/prisma';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Head from 'next/head';
import markdownIt from 'markdown-it';

export default function Post({ post }) {
    if (!post) notFound()

    const md = markdownIt({ breaks: true, html: true, linkify: true });
    const htmlContent = md.render(post.content || '(Nothing here...)');
    const formattedDate = new Date(post.createdAt).toLocaleString('en-US', { year: "numeric", month: "long", day: "numeric" });

    return (<>
        <Header />
        <Head>
            <title>{post.title}</title>
        </Head>
        <article >
            <div className="mt-14 flex items-center justify-center">
                <div className="bg-white min-h-screen p-8 w-full max-w-5xl">
                    <div className="flex gap-5">
                        <time className='italic text-gray-600' dateTime={formattedDate}>{formattedDate}</time>
                        <p className='mb-4 '>By {post.author.name}</p>
                    </div>
                    <h1 className='text-4xl font-bold mb-3'>{post.title}</h1>
                    <div className="post-wrapper list-inside" dangerouslySetInnerHTML={{ __html: (htmlContent) }} ></div>
                </div>
            </div>
        </article>
        <Footer />
    </>);
}

// Fetch data for each page
export async function getServerSideProps({ params }) {
    const post = await prisma.post.findUnique({
        where: { slug: params.slug },
        include: { author: true },
    });

    if (!post) { return { notFound: true, }; }

    return {
        props: { post: JSON.parse(JSON.stringify(post)) },
        // revalidate: 10,
    };
}
