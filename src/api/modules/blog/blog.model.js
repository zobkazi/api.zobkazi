const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Blog = model("Blog", blogSchema);

module.exports = Blog;
