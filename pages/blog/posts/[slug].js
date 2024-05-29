// pages/blog/posts/[slug].js
import { notFound } from 'next/navigation' // new way to not found if using app folder
import prisma from '@/lib/prisma';

export default function Post({ post }) {
  console.log(6, post)
  if (!post) notFound()
  return (
    <article>
      <h1>{post.title}</h1>
      <p>By {post.author.name} on {new Date(post.publishedAt).toLocaleDateString()}</p>
      <div className='bg-gray-200'>{post.content}</div> {/* Display the plain text content for now */}
    </article>
  );
}
// Get all possible paths (slugs) for pre-rendering
export async function getStaticPaths() {
  const posts = await prisma.post.findMany({
    where: {
      unlisted: false, // Only include published posts
    },
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
