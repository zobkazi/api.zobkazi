import { z } from "zod";

export const userSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1, "Name cannot be empty"),
  username: z.string().optional(),
  email: z.string({ required_error: "Email is required" }).email("Invalid email format"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters long"),
  role: z.enum(["user", "admin"], { required_error: "Role is required" }),
  login: z.string().optional(),
  id: z.number().int().positive().optional(),
  node_id: z.string().optional(),
  avatar_url: z.string().url("Invalid URL format").optional(),
  gravatar_id: z.string().optional(),
  url: z.string().url("Invalid URL format").optional(),
  html_url: z.string().url("Invalid URL format").optional(),
  linkedin_url: z.string().url("Invalid URL format").optional(),
  followers_url: z.string().url("Invalid URL format").optional(),
  following_url: z.string().url("Invalid URL format").optional(),
  gists_url: z.string().url("Invalid URL format").optional(),
  starred_url: z.string().url("Invalid URL format").optional(),
  subscriptions_url: z.string().url("Invalid URL format").optional(),
  organizations_url: z.string().url("Invalid URL format").optional(),
  repos_url: z.string().url("Invalid URL format").optional(),
  events_url: z.string().url("Invalid URL format").optional(),
  received_events_url: z.string().url("Invalid URL format").optional(),
  type: z.string().default("User"),
  site_admin: z.boolean().default(false),
  company: z.string().optional(),
  blog: z.string().optional(),
  location: z.string().optional(),
  hireable: z.boolean().optional(),
  bio: z.string().optional(),
  twitter_username: z.string().optional(),
  public_repos: z.number().int().nonnegative().optional(),
  public_gists: z.number().int().nonnegative().optional(),
  followers: z.number().int().nonnegative().optional(),
  following: z.number().int().nonnegative().optional(),
});

export type UserSchema = z.infer<typeof userSchema>;
