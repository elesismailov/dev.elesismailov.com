import { PrismaClient } from '@prisma/client';
// const PrismaClient = require('@prisma/client')

const prisma = new PrismaClient();

async function main() {
  // Create an admin user
  const adminUser = await prisma.user.create({
    data: {
      role: 'ADMIN',
      name: "Admin S",
      email: "admin@localhost.com"
    },
  });

  console.log(`Created admin user with id: ${adminUser.id}`);

  // Create blog posts for the admin user
  await prisma.post.createMany({
    data: [
      {
        title: 'Welcome to My Blog!',
        slug: 'welcome-to-my-blog',
        content: 'This is my first blog post using Prisma and SQLite.',
        preview: 'Get started with your new blog powered by Prisma and SQLite.',
        metaTitle: 'Welcome Blog Post',
        authorId: adminUser.id,
      },
      {
        title: 'Top 10 Tips for Next.js Development',
        slug: 'top-10-nextjs-tips',
        content: 'Learn some useful tricks to enhance your Next.js projects.',
        preview: 'Discover expert advice for Next.js development.',
        metaTitle: 'Next.js Tips',
        authorId: adminUser.id,
      },
    ],
  });

  console.log('Created 2 blog posts for the admin user.');

  // Fetch and log the entire database contents
  const allUsers = await prisma.user.findMany({
    include: { posts: true } // Include posts associated with each user
  });
  console.log('Database contents (users with posts):');
  console.dir(allUsers, { depth: null }); // Log with unlimited depth for nested data
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
