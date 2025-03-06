import { z } from 'zod'
import { IUser } from '../../auth/registration/validation' // Assuming the IUser is in a separate file

// Zod schema for creating a post
export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  authorId: z.number().int().positive(),
  tags: z.array(z.number().int().positive()).optional()
});

// Type inference from the Zod schema
export type CreatePostInput = z.infer<typeof createPostSchema>;

// Zod schema for updating a post
export const updatePostSchema = createPostSchema.partial().extend({
  id: z.number().int().positive()
});

// Type inference for update input
export type UpdatePostInput = z.infer<typeof updatePostSchema>;

// Interface for Comment (simplified for Post references)
interface IComment {
  id: number;
  content: string;
  authorId: number;
  postId: number;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Tag (simplified for Post references)
interface ITag {
  id: number;
  name: string;
}

// Interface for Post model
export interface IPost {
  id: number;
  title: string;
  content: string;
  authorId: number;
  author?: IUser;  // Optional because it might not always be included in queries
  comments?: IComment[];  // Optional array of related comments
  tags?: ITag[];  // Optional array of related tags
  createdAt: Date;
  updatedAt: Date;
}