const BlogService = require("./blog.services");
const validateBlog = require("./blog.validation");

const createBlog = async (request, h) => {
  try {
    const { error } = validateBlog.validate(request.payload);
    if (error) {
      return h.response({ error: error.details[0].message }).code(400);
    }

    const newBlog = await BlogService.createBlog(request.payload);
    return h.response(newBlog).code(201);
  } catch (error) {
    console.error("❌ Error in createBlog:", error);
    return h.response({ error: error.message }).code(500);
  }
};

const getAllBlogs = async (request, h) => {
  try {
    const blogs = await BlogService.getAllBlogs(request.query);
    return h.response(blogs).code(200);
  } catch (error) {
    console.error("❌ Error in getAllBlogs:", error);
    return h.response({ error: error.message }).code(500);
  }
};

const getBlogBySlug = async (request, h) => {
  try {
    const blog = await BlogService.getBlogBySlug(request.params.slug);
    return h.response(blog).code(200);
  } catch (error) {
    console.error("❌ Error in getBlogBySlug:", error);
    return h.response({ error: error.message }).code(404);
  }
};

const updateBlog = async (request, h) => {
  try {
    const updatedBlog = await BlogService.updateBlog(request.params.blogId, request.payload);
    return h.response(updatedBlog).code(200);
  } catch (error) {
    console.error("❌ Error in updateBlog:", error);
    return h.response({ error: error.message }).code(404);
  }
};

const deleteBlog = async (request, h) => {
  try {
    const result = await BlogService.deleteBlog(request.params.blogId);
    return h.response(result).code(200);
  } catch (error) {
    console.error("❌ Error in deleteBlog:", error);
    return h.response({ error: error.message }).code(404);
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
};
