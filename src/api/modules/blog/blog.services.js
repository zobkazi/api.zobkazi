const Blog = require('./blog.model');
const Joi = require('joi');
const { calculateReadTime } = require('./blog.utils');

// Service to create a new blog
exports.createBlog = async (blogData) => {
  try {
    const { error } = await Joi.object({
      slug: Joi.string()
        .required()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .min(3)
        .max(100),
      content: Joi.string().required().min(20).max(5000),
      author: Joi.string().required().min(3).max(100),
      tags: Joi.array()
        .items(Joi.string().min(2).max(30))
        .max(10)
        .default([]),
      readTime: Joi.number().min(1).max(60).default(0),
    }).validate(blogData);

    if (error) {
      throw new Error(error.details[0].message); // Return the validation error message
    }

    const existingBlog = await Blog.findOne({ slug: blogData.slug });
    if (existingBlog) {
      throw new Error('Blog with this slug already exists');
    }

    const newBlog = new Blog(blogData);
    newBlog.readTime = calculateReadTime(newBlog.content);
    await newBlog.save();
    return newBlog;
  } catch (error) {
    throw new Error('Error creating blog post: ' + error.message);
  }
};

// Service to update an existing blog
exports.updateBlog = async (blogId, blogData) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, blogData, { new: true });
    if (!updatedBlog) {
      throw new Error('Blog not found');
    }
    await updatedBlog.save();
    return updatedBlog;
  } catch (error) {
    throw new Error('Error updating blog post: ' + error.message);
  }
};

// Service to get blog by slug
exports.getBlogBySlug = async (slug) => {
  try {
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      throw new Error('Blog not found');
    }
    return blog;
  } catch (error) {
    throw new Error('Error fetching blog post by slug: ' + error.message);
  }
};

// Service to get all blogs with pagination
exports.getAllBlogs = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    const blogs = await Blog.find().skip(skip).limit(limit);
    const totalBlogs = await Blog.countDocuments();

    return {
      blogs,
      pagination: {
        page,
        limit,
        totalBlogs,
        nextPage: page * limit < totalBlogs ? page + 1 : null,
      },
    };
  } catch (error) {
    throw new Error('Error fetching all blogs: ' + error.message);
  }
};

// Service to delete a blog post by ID
exports.deleteBlog = async (blogId) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      throw new Error('Blog not found');
    }
    return deletedBlog;
  } catch (error) {
    throw new Error('Error deleting blog post: ' + error.message);
  }
};
