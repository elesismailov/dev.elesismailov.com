
import { useEffect, useState, useRef } from 'react';
import ProtectedLayer from "@/components/ProtectedLayer";
// import markdownIt from 'markdown-it';
import prisma from "@/lib/prisma";
import AdminHeader from '@/components/AdminHeader';
import { v4 as uuidv4 } from 'uuid';
import { storage, db } from '@/lib/firebase'; // Adjust the path
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { addDoc, collection } from 'firebase/firestore';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function AdminEditPost({ post }) {

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [slug, setSlug] = useState(post.slug);
    const [previewLink, setPreviewLink] = useState(post.preview);
    const [unlisted, setUnlisted] = useState(post.unlisted);

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
    }

    return (<ProtectedLayer>
        <AdminHeader />
        <div className="">
            <div className="mt-5 flex items-center justify-center">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-5xl">
                    <h1 className="text-2xl font-semibold mb-4">Edit Blog Post</h1>
                    <ImageUploadForm />
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
                            <input className="w-full p-2 border rounded" value={slug} onChange={(e) => setSlug(e.target.value)} name="slug" required />
                        </label>
                        <label className='flex items-center mb-5 gap-5'>
                            <p><b>Unlisted:</b></p>
                            <input className="w-6 h-6 border rounded" checked={unlisted} onChange={(e) => {setUnlisted(e.target.checked)}} type='checkbox' name="unlisted" />
                        </label>

                        <label className='content-label mb-5 block'>
                            <p><b>Content:</b></p>
                            <textarea className="w-full h-64 p-2 border rounded" value={content} onChange={(e) => setContent(e.target.value)} name="content" placeholder='This great idea will change your life...' id="content" rows="2" required></textarea>
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

// export async function getStaticPaths() {
//     const posts = await prisma.post.findMany({
//         select: {
//             slug: true
//         }
//     });
//     const paths = posts.map(post => ({
//         params: { slug: post.slug },
//     }));
//     return {
//         paths,
//         fallback: false,
//     };
// }

// Fetch data for each page
export async function getServerSideProps({ params }) {
    const post = await prisma.post.findUnique({
        where: { slug: params.slug },
        include: { author: true },
    });

    if (!post) { return { notFound: true } }

    console.log(post.createdAt.toString())

    return {
        props: { post: JSON.parse(JSON.stringify(post)) },
        // revalidate: 60,
    };
}


const ImageUploadForm = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadError, setUploadError] = useState(null);
    const [images, setImages] = useState([]);

    const fileInputRef = useRef(null); // To clear file input later

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedImage) return;

        setIsUploading(true);
        setUploadError(null);

        try {

            const uuid = uuidv4();
            const originalFilename = selectedImage.name.split('.').slice(0, -1).join('.');
            const uniqueFilename = `${originalFilename}-${uuid}.${selectedImage.name.split('.').pop()}`; // Get the original extension

            // 1. Create a storage reference (where to store in Firebase Storage)
            const storageRef = ref(storage, `images/${uniqueFilename}`);

            // 2. Upload the file
            const uploadTask = uploadBytesResumable(storageRef, selectedImage);

            // 3. Listen for state changes, errors, and completion
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    setUploadError(error.message);
                    setIsUploading(false); // Reset isUploading on error
                    setUploadProgress(0); // Reset progress bar on error
                },
                async () => {
                    // 4. Get the download URL when upload is complete
                    const url = await getDownloadURL(uploadTask.snapshot.ref);

                    setImages(prevImages => [...prevImages, { name: uniqueFilename, url }]);
                    setIsUploading(false);
                    setUploadProgress(0);
                    fileInputRef.current.value = null;
                }
            );

        } catch (error) {
            console.error('Error uploading image:', error);
            setUploadError(error.message || 'Upload failed');
            setIsUploading(false);
        }
    };

    return (
        <div className='mb-7'>
            <h2 className='text-lg font-semibold'>Upload Images:</h2>
            <input type="file" className="bg-red-500 mb-4 border-2 border-red-500 rounded-md" accept="image/*" onChange={handleImageChange} ref={fileInputRef} />

            {selectedImage && (
                <div>
                    {/* <p className='mb-3'>Selected Image: {selectedImage.name}</p> */}
                    {isUploading && (
                        <div className='mb-3'>
                            <progress value={uploadProgress} max="100" />
                            <p>Uploading: {uploadProgress}%</p>
                        </div>
                    )}
                    {!isUploading && (
                        <button className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-44 mb-5' onClick={handleUpload}>Upload Image</button>
                    )}
                    {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
                </div>
            )}

            {/* Render image grid */}
            <div className="flex flew-wrap gap-4">
                {images.map((image) => (
                    <CopyToClipboard className="max-w-24 border-2 border-red-500 rounded-md" key={image.id || image.name} text={image.url}>
                        <button className="relative group" onClick={() => { }}>
                            <img
                                src={image.url}
                                alt={image.name}
                                className="w-full h-auto rounded-md group-hover:opacity-75"
                            />
                            <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {image.name}
                            </div>
                        </button>
                    </CopyToClipboard>
                ))}
            </div>


        </div>
    );

};
