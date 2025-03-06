import { defineEventHandler, getRouterParam } from 'h3';
import prisma from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');

    if (!id) {
      return { success: false, error: 'User ID is required' };
    }

    // Fetch the User by ID
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Remove the password field manually
    const { password, email, ...userWithoutPassword } = user;

    return { success: true, user: userWithoutPassword };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'An unknown error occurred' };
  }
});
