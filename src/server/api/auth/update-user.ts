import prisma from "~/server/utils/prisma";
import jwt from "jsonwebtoken";
import { defineEventHandler, getHeader, readBody, createError } from "h3";

export default defineEventHandler(async (event) => {
  try {
    // Get token from headers
    const token = getHeader(event, "authorization")?.split(" ")[1];
    if (!token) {
      throw createError({ statusCode: 401, message: "Unauthorized" });
    }

    // Verify JWT
    const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";
    let decoded: { userId: string };
    try {
      decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
    } catch (jwtError) {
      throw createError({ statusCode: 401, message: "Invalid token" });
    }

    // Get request body
    const { name, email } = await readBody(event);

    // Validate input
    if (!name || !email) {
      throw createError({ statusCode: 400, message: "Name and email are required" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw createError({ statusCode: 400, message: "Invalid email format" });
    }

    // Check if email is already taken (if different from current user's email)
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        id: { not: decoded.userId }
      }
    });

    if (existingUser) {
      throw createError({ statusCode: 400, message: "Email is already in use" });
    }

    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: { name, email },
      select: { id: true, name: true, email: true, createdAt: true }
    });

    return { user: updatedUser, message: "User information updated successfully" };
  } catch (error) {
    const statusCode = (error as any).statusCode || 500;
    return createError({
      statusCode,
      message: (error as any).message || "Error updating user data"
    });
  }
});