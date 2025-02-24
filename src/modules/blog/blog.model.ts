import { Schema, model, Document } from "mongoose";

export interface IBlog extends Document {
  slug: string;
  content: string;
  author: string;
  tags: string[];
  readTime: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    author: { type: String},
    tags: { type: [String], default: [] },
    readTime: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

// Auto-calculate read time before saving
blogSchema.pre<IBlog>("save", function (next) {
  const wordsPerMinute = 200;
  const words = this.content.split(/\s+/).length;
  this.readTime = Math.ceil(words / wordsPerMinute);
  next();
});

export const Blog = model<IBlog>("Blog", blogSchema);
