// helpers.js
const formatResponse = (status, message, data = null) => {
  return {
    status,
    message,
    data,
  };
};

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

module.exports = {
  formatResponse,
};
