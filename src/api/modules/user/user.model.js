const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    login: { type: String, default: "" },
    id: { type: Number, default: 0 },
    node_id: { type: String, default: "" },
    avatar_url: { type: String, default: "" },
    gravatar_id: { type: String, default: "" },
    url: { type: String, default: "" },
    html_url: { type: String, default: "" },
    linkedin_url: {type: String, default: ""},
    followers_url: { type: String, default: "" },
    following_url: { type: String, default: "" },
    gists_url: { type: String, default: "" },
    starred_url: { type: String, default: "" },
    subscriptions_url: { type: String, default: "" },
    organizations_url: { type: String, default: "" },
    repos_url: { type: String, default: "" },
    events_url: { type: String, default: "" },
    received_events_url: { type: String, default: "" },
    type: { type: String, default: "User" },
    site_admin: { type: Boolean, default: false },
    company: { type: String, default: "" },
    blog: { type: String, default: "" },
    location: { type: String, default: "" },
    hireable: { type: Boolean, default: false },
    bio: { type: String, default: "" },
    twitter_username: { type: String, default: "" },
    public_repos: { type: Number, default: 0 },
    public_gists: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);