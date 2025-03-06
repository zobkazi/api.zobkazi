import prisma from "~/server/utils/prisma";
import { defineEventHandler, createError, getRouterParam } from "h3";

export default defineEventHandler(async (event) => {
  try {
    // Get username from the route parameters
    const username = getRouterParam(event, 'username');
    if (!username) {
      return { success: false, error: 'Username is required' };
    }
    
    // First try to find the user by exact username match
    let user = await prisma.user.findUnique({
      where: {
        username: username,
      }
    });
    
    // If not found, try with trimmed username (to handle trailing spaces)
    if (!user) {
      user = await prisma.user.findFirst({
        where: {
          username: {
            contains: username.trim(),
          }
        }
      });
    }
    
    // If still not found, try to find by email if the input looks like an email
    if (!user && username.includes('@')) {
      user = await prisma.user.findUnique({
        where: {
          email: username,
        }
      });
    }
    
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    
    return user;
  } catch (error) {
    const statusCode = (error as any).statusCode || 500;
    return createError({
      statusCode,
      message: (error as any).message || "Error fetching user",
    });
  }
});