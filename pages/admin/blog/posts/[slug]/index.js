/// POST INFORMATION FOR THE ADMIN

import ProtectedLayer from "@/components/ProtectedLayer";
import prisma from "@/lib/prisma";

export default function AdminPostInfo({ post }) {

    async function handleDelete(event) {
        event.preventDefault()
        const response = await fetch('/api/admin/blog/posts/' + post.slug,
            { method: 'DELETE', headers: { 'Content-Type': 'application/json', }, })

        if (response) {
            window.location.href = "/admin/blog/posts";
        }
    }
    return (<ProtectedLayer>

        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-5xl">
                <header>
                    <nav><ul className="mb-6 flex gap-5 items-center">
                        <li><a href={'/admin/blog/posts/' + post.slug + '/edit'} className="text-md block bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full">Edit This Post</a></li>
                        <li><button onClick={handleDelete} className="text-md block bg-red-500 text-white p-2 rounded hover:bg-red-600 w-full">Delete This Post</button></li>
                    </ul></nav>
                </header>
                <h1 className="text-2xl font-semibold mb-4">Title: {post.title}</h1>
                <p>{post.content}</p>
            </div>
        </div>
    </ProtectedLayer>);
}

export async function getStaticPaths() {
    const posts = await prisma.post.findMany({
        where: { unlisted: false },
        select: { slug: true }
    });
    const paths = posts.map(post => ({
        params: { slug: post.slug },
    }));
    return { paths, fallback: false, };
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

