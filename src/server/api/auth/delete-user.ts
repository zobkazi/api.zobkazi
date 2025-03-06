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

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      throw createError({ statusCode: 404, message: "User not found" });
    }

    // Delete user from database
    await prisma.user.delete({
      where: { id: decoded.userId }
    });

    return { message: "Account deleted successfully" };
  } catch (error) {
    const statusCode = (error as any).statusCode || 500;
    return createError({
      statusCode,
      message: (error as any).message || "Error deleting account"
    });
  }
});