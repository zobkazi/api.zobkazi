import { Router } from "express";
import * as blogController from "./blog.controller";

const blogRouter = Router();

blogRouter.post("/", blogController.createBlog);
blogRouter.get('/', blogController.getAllBlogs)
blogRouter.get("/:slug", blogController.getBlogBySlug);
blogRouter.put("/:slug", blogController.updateBlog);
blogRouter.delete("/:slug", blogController.deleteBlog);

export default blogRouter;
