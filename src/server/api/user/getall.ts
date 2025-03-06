import prisma from "~/server/utils/prisma";
import { defineEventHandler, createError } from "h3";

export default defineEventHandler(async (event) => {
  try {
    // Fetch all users from the database
    const users = await prisma.user.findMany();
    
    if (!users || users.length === 0) {
      return { success: true, users: [], message: "No users found" };
    }
    
    return { success: true, users: users };
  } catch (error) {
    const statusCode = (error as any).statusCode || 500;
    return createError({
      statusCode,
      message: (error as any).message || "Error fetching users",
    });
  }
});