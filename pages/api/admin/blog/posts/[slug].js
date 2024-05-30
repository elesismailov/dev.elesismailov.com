import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    if (req.method === "PUT") { /// EDIT THE POST
        try {
            const { title, preview, slug, content, unlisted } = req.body;

            await prisma.post.update({
                where: { slug: req.query.slug },
                data: { title, preview, slug, content, unlisted }
            });

            return res.status(201).json({ message: "Post updated successfully" });
        } catch (error) {
            console.log(error)
            if (error.code === "P2002") { // Unique constraint violation
                return res.status(409).json({ message: "Post already exists" });
            } else {
                return res.status(500).json({ message: "Error creating post" });
            }
        }
    } else if (req.method === "DELETE") { /// DELETE THE POST
        try {
            
            await prisma.post.delete({
                where: { slug: req.query.slug },
            });

            return res.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Error deleting post" });
        }

    } else { res.status(405).end(); }
}
