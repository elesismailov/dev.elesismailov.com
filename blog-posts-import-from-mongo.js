import fs from 'fs';

import prisma from './lib/prisma.js';

async function main() {
  const rawData = fs.readFileSync('/Users/elesismailov/Downloads/production-vercel.posts1.json');
  const blogPosts = JSON.parse(rawData);

  for (const post of blogPosts) {
    const {
      _id,
      title,
      content,
      slug,
      preview,
      unlisted,
      createdAt,
      updatedAt,
      __v
    } = post;

    console.log(`Title: ${title}`);
    console.log(`Slug: ${slug}`);
    console.log(`Preview: ${preview}`);
    console.log(`Unlisted: ${unlisted}`);
    console.log(`Created At: ${createdAt.$date}`);
    console.log(`Updated At: ${updatedAt.$date}`);
    console.log(`Version: ${__v}`);

    try {
      const createdPost = await prisma.post.create({
        data: {
          title,
          content,
          slug,
          preview: preview || null, // Handle null values
          unlisted,
          createdAt: new Date(createdAt.$date),
          author: {
            connect: {
                id: 1
            }
        },
          // You'll need to fill in the authorId here as it depends on your User model
          // authorId: 1, // Example assuming authorId 1 exists
        },
      });
      console.log(`Created post with id: ${createdPost.id}`);
    } catch (error) {
      console.error(`Error creating post: ${error.message}`);
      // Handle potential errors like duplicate slugs
    }
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
