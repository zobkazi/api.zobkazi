const Blog = require("./blog.model");
const Joi = require("joi");
const { createBlogSchema } = require("./blog.validation");

// create blog controller

const createBlog = async (request, h) => {
  const payload = await createBlogSchema.validateAsync(request.payload);
  if (payload.error) {
    throw Boom.badRequest(payload.error.message);
  }

  const blog = new Blog({
    title: payload.title,
    content: payload.content,
  });
  await blog.save();
  return h
    .response({
      message: "blog created successfully",
      data: blog,
      success: true,
      status: 200,
      error: null,
    })
    .code(200);
};

// get all blogs controller

const getBlogs = async (request, h) => {
  const blogs = await Blog.find();
  return h
    .response({
      message: "blogs fetched successfully",
      data: blogs,
      success: true,
      status: 200,
      error: null,
    })
    .code(200);
};

// get blog by id controller

const getBlogById = async (request, h) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    throw Boom.notFound("blog not found");
  }
  return h
    .response({
      message: "blog fetched successfully",
      data: blog,
      success: true,
      status: 200,
      error: null,
    })
    .code(200);
};

// delete blog controller

const deleteBlog = async (request, h) => {
  const blog = await Blog.findByIdAndDelete(request.params.id);
  if (!blog) {
    throw Boom.notFound("blog not found");
  }
  return h
    .response({
      message: "blog deleted successfully",
      data: blog,
      success: true,
      status: 200,
      error: null,
    })
    .code(200);
};

// create blog controller

module.exports = {
  createBlog,
};
