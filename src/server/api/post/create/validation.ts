import { z } from 'zod'


// Zod schema for creating a post
export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  authorId: z.number().int().positive(),
  tags: z.array(z.number().int().positive()).optional()
});