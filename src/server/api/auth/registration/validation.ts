import { z } from 'zod'

// Zod schema for creating a user
export const createUserSchema = z.object({
  name: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string().default("user"),
  login: z.string().optional().default(""),
  nodeId: z.string().optional().default(""),
  avatarUrl: z.string().optional().default(""),
  gravatarId: z.string().optional().default(""),
  url: z.string().optional().default(""),
  htmlUrl: z.string().optional().default(""),
  linkedinUrl: z.string().optional().default(""),
  followersUrl: z.string().optional().default(""),
  followingUrl: z.string().optional().default(""),
  gistsUrl: z.string().optional().default(""),
  starredUrl: z.string().optional().default(""),
  subscriptionsUrl: z.string().optional().default(""),
  organizationsUrl: z.string().optional().default(""),
  reposUrl: z.string().optional().default(""),
  eventsUrl: z.string().optional().default(""),
  receivedEventsUrl: z.string().optional().default(""),
  type: z.string().optional().default("User"),
  siteAdmin: z.boolean().default(false),
  company: z.string().optional().default(""),
  blog: z.string().optional().default(""),
  location: z.string().optional().default(""),
  hireable: z.boolean().default(false),
  bio: z.string().optional().default(""),
  twitterUsername: z.string().optional().default(""),
  publicRepos: z.number().int().default(0),
  publicGists: z.number().int().default(0),
  followers: z.number().int().default(0),
  following: z.number().int().default(0)
});

// Type inference from the Zod schema
export type CreateUserInput = z.infer<typeof createUserSchema>;

// Interface for User model
export interface IUser {
  id: number;
  name: string | null;
  username: string | null;
  email: string;
  password: string;
  role: string;
  login: string | null;
  nodeId: string | null;
  avatarUrl: string | null;
  gravatarId: string | null;
  url: string | null;
  htmlUrl: string | null;
  linkedinUrl: string | null;
  followersUrl: string | null;
  followingUrl: string | null;
  gistsUrl: string | null;
  starredUrl: string | null;
  subscriptionsUrl: string | null;
  organizationsUrl: string | null;
  reposUrl: string | null;
  eventsUrl: string | null;
  receivedEventsUrl: string | null;
  type: string | null;
  siteAdmin: boolean;
  company: string | null;
  blog: string | null;
  location: string | null;
  hireable: boolean;
  bio: string | null;
  twitterUsername: string | null;
  publicRepos: number;
  publicGists: number;
  followers: number;
  following: number;
  createdAt: Date;
  updatedAt: Date;
}



export const updateUserSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  username: z.string(),
  role: z.string().default("user"),
  login: z.string().default(""),
  nodeId: z.string().default(""),
  avatarUrl: z.string().default(""),
  gravatarId: z.string().default(""),
  url: z.string().default(""),
  htmlUrl: z.string().default(""),
  linkedinUrl: z.string().default(""),
  followersUrl: z.string().default(""),
  followingUrl: z.string().default(""),
  gistsUrl: z.string().default(""),
  starredUrl: z.string().default(""),
  subscriptionsUrl: z.string().default(""),
  organizationsUrl: z.string().default(""),
  reposUrl: z.string().default(""),
  eventsUrl: z.string().default(""),
  receivedEventsUrl: z.string().default(""),
  type: z.string().default("User"),
  siteAdmin: z.boolean().default(false),
  company: z.string().default(""),
  blog: z.string().default(""),
  location: z.string().default(""),
  hireable: z.boolean().default(false),
  bio: z.string().default(""),
  twitterUsername: z.string().default(""),
  publicRepos: z.number().int().default(0),
  publicGists: z.number().int().default(0),
  followers: z.number().int().default(0),
  following: z.number().int().default(0)
});