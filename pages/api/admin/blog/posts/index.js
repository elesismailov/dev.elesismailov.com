// /api/admin/blog/posts/index.js
// this is responsible for creation, deletion, editing of blog posts

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const session = await getServerSession(req, res, authOptions);
            if (session) {
                const { title, preview, slug, content, unlisted } = req.body;
                const user = session?.user;

                await prisma.post.create({
                    data: { title, preview, slug, content, unlisted, authorId: user?.id }
                });

                return res.status(201).json({ message: "Post created successfully" });
            }
            res.status(500).json({ message: "Error creating post" });
        } catch (error) {
            console.log(error)
            if (error.code === "P2002") { // Unique constraint violation
                res.status(409).json({ message: "Post already exists" });
            } else {
                res.status(500).json({ message: "Error creating post" });
            }
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
