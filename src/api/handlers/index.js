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

// update blog controller

const updateBlog = async (request, h) => {
  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.payload,
    { new: true }
  );
  if (!blog) {
    throw Boom.notFound("blog not found");
  }
  return h
    .response({
      message: "blog updated successfully",
      data: blog,
      success: true,
      status: 200,
      error: null,
    })
    .code(200);
};

module.exports = {
  formatResponse,
  getBlogs,
  getBlogById,
  deleteBlog,
  updateBlog,
};
