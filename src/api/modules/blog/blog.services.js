const Blog = require("./blog.model");

const createBlog = async (blogData) => {
  try {
    const blog = new Blog(blogData);
    await blog.save();
    return blog;
  } catch (error) {
    console.error("❌ Error in createBlog:", error);
    throw new Error("Database Error: Unable to create blog");
  }
};

const getAllBlogs = async (query) => {
  try {
    const { page = 1, limit = 10, search, tags } = query;
    const filter = {};

    if (search) {
      filter.$or = [
        { slug: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    if (tags) {
      filter.tags = { $in: tags.split(",") };
    }

    const totalDocs = await Blog.countDocuments(filter);
    const blogs = await Blog.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    return {
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalDocs / limit),
        totalDocs,
        nextPage: page < Math.ceil(totalDocs / limit) ? Number(page) + 1 : null,
        prevPage: page > 1 ? Number(page) - 1 : null,
      },
      blogs,
    };
  } catch (error) {
    console.error("❌ Error in getAllBlogs:", error);
    throw new Error("Database Error: Unable to fetch blogs");
  }
};

const getBlogBySlug = async (slug) => {
  try {
    console.log("🔍 Fetching blog by slug:", slug);
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      throw new Error("Blog not found");
    }

    return blog;
  } catch (error) {
    console.error("❌ Error in getBlogBySlug:", error);
    throw new Error("Database Error: Unable to fetch blog");
  }
};

const updateBlog = async (blogId, updateData) => {
  try {
    console.log("✏️ Updating blog:", blogId);
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateData, { new: true });

    if (!updatedBlog) {
      throw new Error("Blog not found");
    }

    return updatedBlog;
  } catch (error) {
    console.error("❌ Error in updateBlog:", error);
    throw new Error("Database Error: Unable to update blog");
  }
};

const deleteBlog = async (blogId) => {
  try {
    console.log("🗑 Deleting blog:", blogId);
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      throw new Error("Blog not found");
    }

    return { message: "Blog deleted successfully" };
  } catch (error) {
    console.error("❌ Error in deleteBlog:", error);
    throw new Error("Database Error: Unable to delete blog");
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
};
