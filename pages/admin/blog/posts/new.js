
import { useEffect, useState } from 'react';
import ProtectedLayer from "@/components/ProtectedLayer";
import AdminHeader from '@/components/AdminHeader';
// import markdownIt from 'markdown-it';
import { v4 as uuidv4 } from 'uuid';



export default function AdminNewPost() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [slug, setSlug] = useState('');
    const [previewLink, setPreviewLink] = useState('');
    const [unlisted, setUnlisted] = useState(false);

    useEffect(() => {
        const generateSlug = (title) => {
            const slugifiedTitle = title
                .toLowerCase()
                .trim()
                .replace(/ /g, '-') // Replace spaces with hyphens
                .replace(/[^\w-]+/g, ''); // Remove non-alphanumeric characters

            return `${slugifiedTitle}-${uuidv4().slice(0, 13)}`; // Add a unique ID
        };

        setSlug(generateSlug(title));
    }, [title]); // Run only when the title changes

    const handleSubmit = async event => {
        event.preventDefault();
        const postData = { title, preview: previewLink, slug, content, unlisted };
        const response = await fetch('/api/admin/blog/posts', {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            window.location.href = '/admin/blog/posts/';
        }
    };

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
                            <input className="w-full p-2 border rounded" value={slug} onChange={(e) => setSlug(e.target.value)} name="slug" required />
                        </label>
                        <label className='flex items-center mb-5 gap-5'>
                            <p><b>Unlisted:</b></p>
                            <input className="w-6 h-6 border rounded" value={unlisted} onChange={(e) => { setUnlisted(e.target.checked) }} type='checkbox' name="unlisted" />
                        </label>

                        <label className='content-label mb-5 block'>
                            <p><b>Content:</b></p>
                            <textarea className="w-full p-2 h-64 border rounded" onChange={(e) => setContent(e.target.value)} name="content" placeholder='This great idea will change your life...' id="content" rows="2" required></textarea>
                        </label>
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full">
                            Create New Post
                        </button>
                    </form>

                    {/* <ImageUploadForm /> */}
                </div>
            </div>
        </div>
    </ProtectedLayer>)
}

// const ImageUploadForm = () => {
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [isUploading, setIsUploading] = useState(false);
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [uploadError, setUploadError] = useState(null);
//     const [imageUrl, setImageUrl] = useState(null);

//     const handleImageChange = (event) => {
//         setSelectedImage(event.target.files[0]);
//     };

//     const handleUpload = async () => {
//         if (!selectedImage) return;

//         const fileExtension = selectedImage.name.split('.').pop(); // Get file extension

//         setIsUploading(true);
//         setUploadError(null);

//         try {
//             const response = await fetch('/api/handle/blog-files', {
//                 method: 'POST',
//                 body: selectedImage, // Send the file directly as the body
//                 headers: {
//                     'Content-Type': `image/${fileExtension}`, // Explicitly set the correct Content-Type
//                 },
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setImageUrl(data.imageUrl);
//             } else {
//                 throw new Error('Image upload failed');
//             }
//         } catch (error) {
//             console.error('Error uploading image:', error);
//             setUploadError(error.message || 'Upload failed');
//         } finally {
//             setIsUploading(false);
//         }
//     };

//     return (
//         <div>
//             <input type="file" accept="image/*" onChange={handleImageChange} />
//             {selectedImage && (
//                 <div>
//                     <p>Selected Image: {selectedImage.name}</p>
//                     {isUploading && (
//                         <div>
//                             <progress value={uploadProgress} max="100" />
//                             <p>Uploading: {uploadProgress}%</p>
//                         </div>
//                     )}
//                     {!isUploading && (
//                         <button onClick={handleUpload}>Upload Image</button>
//                     )}
//                     {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
//                     {imageUrl && <img src={imageUrl} alt="Uploaded image" style={{ maxWidth: '200px' }} />}
//                 </div>
//             )}
//         </div>
//     );
// };