import Header from '@/components/Header';
import prisma from '@/lib/prisma';
import ProtectedLayer from "@/components/ProtectedLayer";
import AdminHeader from '@/components/AdminHeader';

export default function AdminBlogPosts({ posts }) {  // Receive posts directly as props

    return (<ProtectedLayer>
        <AdminHeader />
        <div className='max-w-2xl m-auto mt-5'>
            <h1 className='text-xl mb-5 text-center'>Admin Blog Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id} className='mb-10 bg-gray-200 rounded-md p-5 text-white'>
                        <h2 className='text-xl text-blue-400'><a href={"/admin/blog/posts/" + post.slug}>{post.title}</a></h2>
                        {post.unlisted ?
                            <p className='text-red-400'>Unlisted</p>
                            : <p className='text-green-400'>Public</p>
                        }
                        <p className=''>{new Date(post.createdAt).toLocaleString('en-US', { year: "numeric", month: "long", day: "numeric" })}</p>
                    </li>
                    //   <BlogPostCard key={post.id} post={post} />
                ))}
            </ul>
        </div>
    </ProtectedLayer>)
}

export async function getStaticProps() {
    const posts = await prisma.post.findMany({
        where: {
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
