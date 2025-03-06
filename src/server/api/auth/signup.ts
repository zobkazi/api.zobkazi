import prisma from "~/server/utils/prisma"; // Import Prisma client
import bcrypt from "bcryptjs";
import { defineEventHandler, readBody, createError } from "h3"; // Make sure to import necessary types

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event); // Get request body
    const { username, email, password } = body;

    // ✅ Basic validation
    if (!username || !email || !password) {
      throw createError({ statusCode: 400, message: "All fields are required" });
    }

    if (!email.includes("@") || email.length < 5) {
      throw createError({ statusCode: 400, message: "Invalid email format" });
    }

    if (password.length < 6) {
      throw createError({ statusCode: 400, message: "Password must be at least 6 characters long" });
    }

    // ✅ Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw createError({ statusCode: 400, message: "Email is already in use" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user
    const newUser = await prisma.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword,
      },
    });

    // Optionally, exclude the hashed password from the response
    return {
      message: "User registered successfully",
      user: { id: newUser.id, email: newUser.email },
    };
  } catch (error) {
    // Check if error has a statusCode and return that; otherwise, return a generic error
    const statusCode = (error as any).statusCode || 500;
    return createError({ statusCode, message: (error as any).message || "Something went wrong" });
  }
});
