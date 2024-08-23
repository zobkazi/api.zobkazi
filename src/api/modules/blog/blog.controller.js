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

module.exports = {
  createBlog,
};
