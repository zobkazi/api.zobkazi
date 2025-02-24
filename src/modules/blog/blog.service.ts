import { Blog, IBlog } from "./blog.model";

export const createBlog = async (data: Partial<IBlog>): Promise<IBlog> => {
  const blog = new Blog(data);
  return await blog.save();
};

export const getBlogBySlug = async (slug: string): Promise<IBlog | null> => {
  return await Blog.findOne({ slug });
};

export const updateBlog = async (slug: string, data: Partial<IBlog>): Promise<IBlog | null> => {
  return await Blog.findOneAndUpdate({ slug }, data, { new: true });
};

export const deleteBlog = async (slug: string): Promise<IBlog | null> => {
  return await Blog.findOneAndDelete({ slug });
};



export const getAllBlogs = async (
    search?: string,
    tags?: string[],
    page: number = 1,
    limit: number = 10
  ): Promise<{ blogs: IBlog[]; total: number }> => {
    const query: any = {};
  
    if (search) {
      query.$or = [
        { slug: new RegExp(search, "i") },
        { content: new RegExp(search, "i") },
        { author: new RegExp(search, "i") },
      ];
    }
  
    if (tags && tags.length > 0) {
      query.tags = { $in: tags };
    }
  
    const blogs = await Blog.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
  
    const total = await Blog.countDocuments(query);
  
    return { blogs, total };
  };