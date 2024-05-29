'use client';

import { useState } from 'react';
import { signIn, signOut, SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";

export default function LoginPage() {
    // const router = useRouter();
    const { data: session, status } = useSession();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setError(result.error);
            } else {
                // Successful login, redirect to a protected page
                console.log('Successful login, redirect to a protected page')
                // router.push('/dashboard'); // Replace '/dashboard' with your actual protected route
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        }
    };

    // If the user is already logged in, redirect to the dashboard
    //   if (status === "authenticated") {
    //     router.push("/dashboard"); // Replace '/dashboard' with your actual protected route
    //   }

    return (<>

        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <p>{session?.user?.name}</p>
            <p>{session?.user?.email}</p>
            {status === 'authenticated' &&
                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={signOut}>Sign Out</button>
            }
            <a className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' href="/admin/blog/posts/new">New Blog Post</a>
        </div>

        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-4">Login</h1>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                        required
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-2 border rounded"
                        required
                    />

                    <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full">
                        Login
                    </button>
                </form>
            </div>
        </div>

    </>);
}
