// pages/blog/index.js
// import BlogPostCard from '@/components/BlogPostCard'; 
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import prisma from '@/lib/prisma';

export default function BlogPage({ posts }) {  // Receive posts directly as props

    return (<>
        <Header />
        <Head>
            <title>My Blog</title>
        </Head>
        <div className='max-w-4xl min-h-screen mx-auto mt-14'>
            <h1 className='text-4xl mb-7'>My Blog</h1>
            <ul>
                {posts.map((post) => {
                    const formattedDate = new Date(post.createdAt).toLocaleString('en-US', { year: "numeric", month: "long", day: "numeric" });
                    return <li key={post.id} className='mb-10 bg-black rounded-md p-5 text-white'>
                        <h2 className='text-2xl mb-3 hover:text-red-500' ><a href={"/blog/posts/" + post.slug}>{post.title}</a></h2>
                        <time className='italic text-gray-400' dateTime={formattedDate}>{formattedDate}</time>
                    </li>
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
