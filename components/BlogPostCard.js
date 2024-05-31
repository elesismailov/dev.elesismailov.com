import Link from 'next/link';

export default function BlogPostCard ({ post }) {
    const formattedDate = new Date(post.createdAt).toLocaleString('en-US', { year: "numeric", month: "long", day: "numeric" });
    return (
        <li key={post?.id} className="flex flex-col mt-auto mr-0 mb-2 ml-0 max-w-[350px] w-full h-full rounded-md shadow-md overflow-hidden">
            <a className='block' href={'/blog/posts/' + post.slug} tabIndex={-1}>
                <div className="mb-5 block w-full max-h-52 h-52 bg-black overflow-hidden">
                    <div className="w-full h-full block">
                        {!!post.preview ?
                            <img className="max-w-full h-full" src={post.preview} alt={post.title + " preview"} />
                            :
                            <div className=""></div>
                            // <img className="max-w-full h-full" src="/redacted.png" alt="A black background with a word redactepost." />
                        }
                    </div>
                </div>
            </a>
            <div className="flex flex-col justify-between h-full py-0 px-4 pb-5">
                <h2 className='title text-xl text-black mb-2'><a href={'/blog/posts/' + post.slug}>{post.title}</a></h2>
                {/* <hr className="my-4 mx-[-1.5rem]"/> */}
                <time className="text-sm text-gray-500" dateTime={post.createdAt}>{formattedDate}</time>
            </div>
        </li>
    );
}