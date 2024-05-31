
import { useEffect, useState } from 'react';
import ProtectedLayer from "@/components/ProtectedLayer";
import AdminHeader from '@/components/AdminHeader';
// import markdownIt from 'markdown-it';



export default function AdminNewPost() {

    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [slug, setSlug] = useState(null);
    const [previewLink, setPreviewLink] = useState(null);
    const [unlisted, setUnlisted] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault()
        const response = await fetch('/api/admin/blog/posts',
            {
                method: 'POST',
                body: JSON.stringify({ title, preview: previewLink, slug, content, unlisted }),
                headers: { 'Content-Type': 'application/json', },
            })
        if (response.ok) {
            window.location.href = "/admin/blog/posts/";
        }
    }

    return (<ProtectedLayer>
        <AdminHeader />
        <div className="blog-new-post">
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-5xl">
                    <h1 className="text-2xl font-semibold mb-4">New Blog Post</h1>
                    <form onSubmit={handleSubmit}>
                        <label className='mb-5 block'>
                            <p><b>Title:</b></p>
                            <input className="w-full p-2 border rounded" onChange={(e) => setTitle(e.target.value)} name="title" placeholder='Valuable Idea' required />
                        </label>
                        <label className='mb-5 block'>
                            <p><b>Preview Link:</b></p>
                            <input className="w-full p-2 border rounded" onChange={(e) => setPreviewLink(e.target.value)} name="preview-link" placeholder='http://image-assets.com/example.jpg' />
                        </label>
                        <label className='mb-5 block'>
                            <p><b>Slug:</b></p>
                            <input className="w-full p-2 border rounded" onChange={(e) => setSlug(e.target.value)} name="slug" />
                        </label>
                        <label className='flex items-center mb-5 gap-5'>
                            <p><b>Unlisted:</b></p>
                            <input className="w-6 h-6 border rounded" value={unlisted} onChange={(e) => {setUnlisted(e.target.checked)}} type='checkbox' name="unlisted" />
                        </label>

                        <label className='content-label mb-5 block'>
                            <p><b>Content:</b></p>
                            <textarea className="w-full p-2 h-64 border rounded" onChange={(e) => setContent(e.target.value)} name="content" placeholder='This great idea will change your life...' id="content" rows="2" required></textarea>
                        </label>
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full">
                            Create New Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </ProtectedLayer>)
}

