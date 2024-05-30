
import { useEffect, useState } from 'react';
import ProtectedLayer from "@/components/ProtectedLayer";
// import markdownIt from 'markdown-it';
import prisma from "@/lib/prisma";
import AdminHeader from '@/components/AdminHeader';


export default function AdminEditPost({ post }) {

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [slug, setSlug] = useState(post.slug);
    const [previewLink, setPreviewLink] = useState(post.preview);
    const [unlisted, setUnlisted] = useState(post.unlisted);

    async function handleSubmit(event) {
        event.preventDefault()
        console.log(unlisted)
        const response = await fetch('/api/admin/blog/posts/' + post.slug,
            {
                method: 'PUT',
                body: JSON.stringify({ title, preview: previewLink, slug, content, unlisted }),
                headers: { 'Content-Type': 'application/json', },
            })
        if (response.ok) {
            window.location.href = "/admin/blog/posts/" + slug;
        }
        // manually redirecting if the server redirected somewhere
        // if (response.redirected) {
        //     window.location.href = response.url;
        // }
    }

    return (<ProtectedLayer>
        <AdminHeader />
        <div className="">
            <div className="mt-5 flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-5xl">
                    <h1 className="text-2xl font-semibold mb-4">Edit Blog Post</h1>
                    <form onSubmit={handleSubmit}>
                        <label className='mb-5 block'>
                            <p><b>Title:</b></p>
                            <input className="w-full p-2 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} name="title" placeholder='Valuable Idea' type='text' required />
                        </label>
                        <label className='mb-5 block'>
                            <p><b>Preview Link:</b></p>
                            <input className="w-full p-2 border rounded" value={previewLink} onChange={(e) => setPreviewLink(e.target.value)} name="preview-link" type='text' placeholder='http://image-assets.com/example.jpg' />
                        </label>
                        <label className='mb-5 block'>
                            <p><b>Slug:</b></p>
                            <input className="w-full p-2 border rounded" value={slug} onChange={(e) => setSlug(e.target.value)} name="slug" type='text' />
                        </label>
                        <label className='flex items-center mb-5 gap-5'>
                            <p><b>Unlisted:</b></p>
                            <input className="w-6 h-6 border rounded" value={unlisted} onChange={(e) => {setUnlisted(e.target.checked)}} type='checkbox' name="unlisted" />
                        </label>

                        <label className='content-label mb-5 block'>
                            <p><b>Content:</b></p>
                            <textarea className="w-full p-2 border rounded" value={content} onChange={(e) => setContent(e.target.value)} name="content" placeholder='This great idea will change your life...' id="content" rows="2" required></textarea>
                        </label>
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full">
                            Update This Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </ProtectedLayer>)
}

export async function getStaticPaths() {
    const posts = await prisma.post.findMany({
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

