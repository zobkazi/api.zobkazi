import mongoose, { Document, Schema } from "mongoose";

// Define the User interface
interface IUser extends Document {
  name: string;
  username?: string;
  email: string;
  password: string;
  role: "user" | "admin";
  login?: string;
  id: number;
  node_id?: string;
  avatar_url?: string;
  gravatar_id?: string;
  url?: string;
  html_url?: string;
  linkedin_url?: string;
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations_url?: string;
  repos_url?: string;
  events_url?: string;
  received_events_url?: string;
  type: string;
  site_admin: boolean;
  company?: string;
  blog?: string;
  location?: string;
  hireable: boolean;
  bio?: string;
  twitter_username?: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
}

// Define the user schema
const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, trim: true },
    username: { type: String, trim: true },
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
    linkedin_url: { type: String, default: "" },
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Create the User model
const User = mongoose.model<IUser>("User", userSchema);

export default User;
