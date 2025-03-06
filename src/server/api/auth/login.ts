import prisma from "~/server/utils/prisma"; // Import Prisma client
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { defineEventHandler, readBody, createError } from "h3";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Use environment variable for security

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event); // Get request body
    const { email, password } = body;

    // ✅ Validate inputs
    if (!email || !password) {
      throw createError({ statusCode: 400, message: "All fields are required" });
    }

    if (!email.includes("@") || email.length < 5) {
      throw createError({ statusCode: 400, message: "Invalid email format" });
    }

    // ✅ Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw createError({ statusCode: 401, message: "Invalid credentials" });
    }

    // ✅ Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw createError({ statusCode: 401, message: "Invalid credentials" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      SECRET_KEY,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Return success response with token
    return { message: "Login successful", token };
  } catch (error) {
    // Type guard to handle known error types
    const statusCode = (error as any).statusCode || 500; // Use error's statusCode if available, otherwise default to 500
    return createError({ statusCode, message: (error as any).message || "Something went wrong" });
  }
});
