'use client';

/// This shit checks if the session is active and shit.
// if not then it redirects.
// I think this is automatically checked in the NextAuth.
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ProtectedLayer({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    router.push('/admin/login'); // Redirect to the login page
    return null; // Return null to prevent flashing unauthenticated content
  }

  return <>{children}</>; // Render the children (wrapped components)
}
