import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, name, password } = req.body;

      // Hash the password before saving to the database
      const hashedPassword = await bcrypt.hash(password, 10); 

      console.log(req.body, hashedPassword)


      // Create a new user in Prisma
      const user = await prisma.user.create({
        data: {
          email,
          name: name,
          password: hashedPassword,
        },
      });

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.log(error)
      if (error.code === "P2002") { // Unique constraint violation
        res.status(409).json({ message: "Email already exists" });
      } else {
        res.status(500).json({ message: "Error creating user" });
      }
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
