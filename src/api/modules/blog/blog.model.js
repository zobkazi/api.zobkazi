const { Schema, model } = require('mongoose');

const blogSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    readTime: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Blog = model('Blog', blogSchema);

module.exports = Blog;
