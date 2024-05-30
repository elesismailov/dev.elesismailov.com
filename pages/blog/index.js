// pages/blog/index.js
// import BlogPostCard from '@/components/BlogPostCard'; 
import Header from '@/components/Header';
import prisma from '@/lib/prisma';

export default function BlogPage({ posts }) {  // Receive posts directly as props

    return (<>
        {/* <Header /> */}
        <div>
            <h1>My Blog</h1>
            <ul>
                {posts.map((post) => (
                    <li className='mb-10 bg-black rounded-md p-5 text-white'>
                        <h2><a href={"/blog/posts/" + post.slug}>{post.title}</a></h2>
                        <p>{new Date(post.createdAt).toLocaleString('en-US', { year: "numeric", month: "long", day: "numeric" })}</p>
                    </li>
                    //   <BlogPostCard key={post.id} post={post} />
                ))}
            </ul>
        </div>
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

    // Transform data if necessary (e.g., date formatting, etc.)

    return {
        props: { posts: JSON.parse(JSON.stringify(posts)) },   // Pass posts directly, Prisma returns plain objects
        revalidate: 10,
    };
}
