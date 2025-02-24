import { Request, Response } from "express";
import * as blogService from "./blog.service";
import { blogQuerySchema, blogSchema, blogUpdateSchema } from "./blog.validation";
import { ZodError } from "zod";

export const createBlog = async (req: Request, res: Response) => {
  try {
    const validatedData = blogSchema.parse(req.body);
    const blog = await blogService.createBlog(validatedData);
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getBlogBySlug = async (req: Request, res: Response) => {
  const blog = await blogService.getBlogBySlug(req.params.slug);
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  res.json(blog);
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const validatedData = blogUpdateSchema.parse(req.body);
    const blog = await blogService.updateBlog(req.params.slug, validatedData);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ ZodError });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  const blog = await blogService.deleteBlog(req.params.slug);
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  res.json({ message: "Blog deleted successfully" });
};



export const getAllBlogs = async (req: Request, res: Response) => {
    try {
      const validatedQuery = blogQuerySchema.parse(req.query);
      
      const search = validatedQuery.search || undefined;
      const tags = validatedQuery.tags ? validatedQuery.tags.split(",") : undefined;
      const page = validatedQuery.page ? parseInt(validatedQuery.page, 10) : 1;
      const limit = validatedQuery.limit ? parseInt(validatedQuery.limit, 10) : 10;
  
      const { blogs, total } = await blogService.getAllBlogs(search, tags, page, limit);
  
      res.json({
        total,
        page,
        limit,
        blogs,
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  };
  