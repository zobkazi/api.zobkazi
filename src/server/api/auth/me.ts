import prisma from "~/server/utils/prisma";
import jwt from "jsonwebtoken";
import { defineEventHandler, getHeader, createError } from "h3";

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

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    if (!user) {
      throw createError({ statusCode: 404, message: "User not found" });
    }

    return { user };
  } catch (error) {
    // Type guard for known error types
    const statusCode = (error as any).statusCode || 500; // Default to 500 if statusCode is not present
    return createError({ statusCode, message: (error as any).message || "Error fetching user data" });
  }
});
