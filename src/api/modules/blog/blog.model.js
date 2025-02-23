const { Schema, model } = require("mongoose");

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

// Auto-calculate read time before saving
blogSchema.pre("save", function (next) {
  const wordsPerMinute = 200;
  const words = this.content.split(/\s+/).length;
  this.readTime = Math.ceil(words / wordsPerMinute);
  next();
});

const Blog = model("Blog", blogSchema);
module.exports = Blog;
