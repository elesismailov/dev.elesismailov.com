/// POST INFORMATION FOR THE ADMIN

import AdminHeader from "@/components/AdminHeader";
import ProtectedLayer from "@/components/ProtectedLayer";
import prisma from "@/lib/prisma";

import { useState } from 'react';
import markdownIt from 'markdown-it';

export default function AdminPostInfo({ post }) {

    const md = markdownIt({ breaks: true, html: true, linkify: true });
    const htmlContent = md.render(post.content || '(Nothing here...)');
    
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDelete = async (event) => {
        event.preventDefault()
        if (window.confirm('Are you sure you want to delete this post?')) {
            setShowConfirmation(true);
            const response = await fetch('/api/admin/blog/posts/' + post.slug,
                { method: 'DELETE', headers: { 'Content-Type': 'application/json', }, })

            if (response.ok) {
                setShowConfirmation(false);
                window.location.href = "/admin/blog/posts/";
            }
        }
    }
    if (showConfirmation) {
        return <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-white p-4 rounded">
                <p className="text-center">Deleting...</p>
            </div>
        </div>
    }
    // async function handleDelete(event) {
    //     event.preventDefault()
    //     const response = await fetch('/api/admin/blog/posts/' + post.slug,
    //         { method: 'DELETE', headers: { 'Content-Type': 'application/json', }, })

    //     if (response.ok) {
    //         window.location.href = "/admin/blog/posts/";
    //     }
    // }
    return (<ProtectedLayer>
        <AdminHeader />
        <div className="mt-5 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-5xl">
                <header>
                    <nav><ul className="mb-6 flex gap-5 items-center">
                        <li><a href={'/admin/blog/posts/' + post.slug + '/edit'} className="text-md block bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full">Edit This Post</a></li>
                        <li><button onClick={handleDelete} className="text-md block bg-red-500 text-white p-2 rounded hover:bg-red-600 w-full">Delete This Post</button></li>
                    </ul></nav>
                </header>
                <h1 className="text-2xl font-semibold">Title: {post.title}</h1>
                {post.unlisted ?
                    <p className='text-red-400'>Unlisted</p>
                    : <p className='text-green-400'>Public</p>
                }
                <p className="mb-4 text-gray-600">{new Date(post.createdAt).toLocaleString('en-US', { year: "numeric", month: "long", day: "numeric" })}</p>
                { post.preview && <div className="mb-4 max-w-96 border-2 rounded-md border-black"><img src={post.preview} alt="" /></div>}
                <div className="post-wrapper list-inside" dangerouslySetInnerHTML={{ __html: (htmlContent) }} ></div>
            </div>
        </div>
    </ProtectedLayer>);
}


// Fetch data for each page
export async function getServerSideProps({ params }) {
    const post = await prisma.post.findUnique({
        where: { slug: params.slug },
        include: { author: true },
    });

    if (!post) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            post: JSON.parse(JSON.stringify(post)),
        },
        // revalidate: 60,
    };
}

