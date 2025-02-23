const blogService = require('./blog.services');
const { createBlogSchema } = require('./blog.validation'); // Import the schema

// Controller to handle creating a new blog post
const createBlog = async (request, h) => {
  const { slug, content, author, tags } = request.payload;

  // Validate incoming data with Joi schema
  try {
    await createBlogSchema.validateAsync(request.payload);
  } catch (error) {
    return h.response({ error: error.details[0].message }).code(400);
  }

  try {
    const newBlog = await blogService.createBlog({
      slug,
      content,
      author,
      tags,
    });

    return h.response({
      message: 'Blog created successfully',
      blog: newBlog,
    }).code(201);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

// Controller to handle updating a blog post
const updateBlog = async (request, h) => {
  const { blogId } = request.params;
  const { slug, content, author, tags } = request.payload;

  try {
    const updatedBlog = await blogService.updateBlog(blogId, {
      slug,
      content,
      author,
      tags,
    });

    return h.response({
      message: 'Blog updated successfully',
      blog: updatedBlog,
    }).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

// Controller to fetch a blog by slug
const getBlogBySlug = async (request, h) => {
  const { slug } = request.params;

  try {
    const blog = await blogService.getBlogBySlug(slug);
    return h.response(blog).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(404);
  }
};

// Controller to get all blogs with pagination
const getAllBlogs = async (request, h) => {
  const { page = 1, limit = 10 } = request.query;

  try {
    const result = await blogService.getAllBlogs(page, limit);
    return h.response(result).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

// Controller to delete a blog post by ID
const deleteBlog = async (request, h) => {
  const { blogId } = request.params;

  try {
    const deletedBlog = await blogService.deleteBlog(blogId);
    return h.response({
      message: 'Blog deleted successfully',
      blog: deletedBlog,
    }).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(404);
  }
};

module.exports = {
  deleteBlog,
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
};
