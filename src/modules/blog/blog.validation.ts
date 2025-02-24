import { z } from "zod";

export const blogSchema = z.object({
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  author: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const blogUpdateSchema = blogSchema.partial();


export const blogQuerySchema = z.object({
    search: z.string().optional(),
    tags: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
  });