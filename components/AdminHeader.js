
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function AdminHeader() {
    const { data: session, status } = useSession();

    return (<>
        <header className="bg-white flex flex-col gap-5 items-center justify-between p-8 rounded shadow-md w-full
            md:flex-row">
            <div className="flex gap-10 ">
                <p>{session?.user?.name}</p>
                <p>{session?.user?.email}</p>
            </div>
            <nav><ul className='flex items-center gap-4'>
                <li> {status === 'authenticated' && <button className='block text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={signOut}>Sign Out</button>}</li>
                <li> <Link className='block text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' href="/admin/blog/posts/new">New Blog Post</Link> </li>
                <li> <Link className='block text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' href="/admin/blog/posts">All Blog Posts</Link> </li>
            </ul></nav>
        </header>

    </>);
}