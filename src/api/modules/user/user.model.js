const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    node_id: { type: String },
    avatar_url: { type: String },
    gravatar_id: { type: String, default: "" },
    url: { type: String, default: "" },
    html_url: { type: String, default: "" },
    followers_url: { type: String, default: "" },
    following_url: { type: String, default: "" },
    starred_url: { type: String, default: "" },
    subscriptions_url: { type: String, default: "" },
    organizations_url: { type: String, default: "" },
    events_url: { type: String, default: "" },
    received_events_url: { type: String, default: "" },
    type: { type: String, default: "" },
    site_admin: { type: Boolean, default: false },
    company: { type: String, default: "", trim: true },
    blog: { type: String, default: "" },
    location: { type: String, default: "" },
    hireable: { type: Boolean, default: null },
    bio: { type: String, default: "" },
    twitter_username: { type: String, default: "" },
    public_repos: { type: Number, default: 0 },
    public_gists: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    name: { type: String, required: true, trim: true },
    user_name: { type: String, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
