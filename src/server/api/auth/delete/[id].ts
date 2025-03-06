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

    // Ensure the user has the necessary permission
    // (In this case, they must be the owner of the account they're deleting)
    const { userId } = decoded;

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) }
    });

    if (!user) {
      throw createError({ statusCode: 404, message: "User not found" });
    }

    // Delete the user from the database
    await prisma.user.delete({
      where: { id: Number(userId) }
    });

    // Return a structured success response
    return { statusCode: 200, body: { success: true, message: "Account deleted successfully" } };

  } catch (error) {
    const statusCode = (error as any).statusCode || 500;
    return createError({
      statusCode,
      message: (error as any).message || "Error deleting account"
    });
  }
});
