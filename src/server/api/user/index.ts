import { defineEventHandler } from 'h3';
import prisma from '~/server/utils/prisma';

export default defineEventHandler(async () => {
  try {
    const totalUsers = await prisma.user.count();
    
    return {
      success: true,
      totalUsers,
    };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' };
  }
});