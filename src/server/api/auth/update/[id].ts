import { defineEventHandler, readBody } from 'h3';
import prisma from '~/server/utils/prisma';
import { updateUserSchema } from '../registration/validation';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const validatedData = updateUserSchema.safeParse(body);

        if (!validatedData.success) {
            const errorMessages = validatedData.error.errors.map(e => e.message);
            throw createError({
                statusCode: 400,
                message: `Invalid input: ${errorMessages.join(', ')}`
            });
        }

        // Extract the validated data
        const { id, ...updateData } = validatedData.data;

        // Ensure id exists
        if (!id) {
            throw createError({
                statusCode: 400,
                message: "User ID is required."
            });
        }

        // If no fields to update, return a clear response
        if (Object.keys(updateData).length === 0) {
            return { statusCode: 400, body: { success: false, error: 'No fields to update provided.' } };
        }

        // Check if user exists
        const userExists = await prisma.user.findUnique({
            where: { id: Number(id) }
        });

        if (!userExists) {
            throw createError({
                statusCode: 404,
                message: `User with id ${id} not found`
            });
        }

        // Update the user in the database using Prisma
        const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: updateData
        });

        // Return the updated user data
        return { statusCode: 200, body: { success: true, data: updatedUser } };

    } catch (error) {
        const statusCode = (error as any).statusCode || 500;
        return createError({ statusCode, message: (error as any).message || "Something went wrong" });
    }
});
