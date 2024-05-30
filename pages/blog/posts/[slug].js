// pages/blog/posts/[slug].js
import { notFound } from 'next/navigation' // new way to not found if using app folder
import prisma from '@/lib/prisma';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Post({ post }) {
    console.log(6, post)
    if (!post) notFound()

    const formattedDate = new Date(post.createdAt).toLocaleString('en-US', { year: "numeric", month: "long", day: "numeric" });
    return (<>
        <Header />
        <article >
            <div className="mt-5 flex items-center justify-center">
                <div className="bg-white min-h-screen p-8 w-full max-w-5xl">
                    <div className="flex gap-5">
                        <time className='italic text-gray-600' dateTime={formattedDate}>{formattedDate}</time>
                        <p className='mb-4 '>By {post.author.name}</p>
                    </div>
                    <h1 className='text-4xl mb-3'>{post.title}</h1>
                    <div className=''>{post.content}</div>
                </div>
            </div>
        </article>
        <Footer />
    </>);
}
// Get all possible paths (slugs) for pre-rendering
export async function getStaticPaths() {
    const posts = await prisma.post.findMany({
        where: {
            unlisted: false, // Only include published posts
        },
        select: {
            slug: true
        }
    });
    const paths = posts.map(post => ({
        params: { slug: post.slug },
    }));
    return {
        paths,
        fallback: false,
    };
}

// Fetch data for each page
export async function getStaticProps({ params }) {
    const post = await prisma.post.findUnique({
        where: { slug: params.slug },
        include: { author: true },
    });

    if (!post) {
        return {
            notFound: true,
        };
    }

    console.log(post.createdAt.toString())

    return {
        props: {
            post: JSON.parse(JSON.stringify(post)),
        },
        revalidate: 60,
    };
}
