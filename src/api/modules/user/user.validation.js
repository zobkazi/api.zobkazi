const Joi = require("joi");

exports.updateUserSchema = Joi.object({
  login: Joi.string().optional(),
  node_id: Joi.string().optional(),
  avatar_url: Joi.string().uri().optional(),
  gravatar_id: Joi.string().optional().default(""),
  url: Joi.string().uri().optional().default(""),
  html_url: Joi.string().uri().optional().default(""),
  followers_url: Joi.string().uri().optional().default(""),
  following_url: Joi.string().uri().optional().default(""),
  starred_url: Joi.string().uri().optional().default(""),
  subscriptions_url: Joi.string().uri().optional().default(""),
  organizations_url: Joi.string().uri().optional().default(""),
  repos_url: Joi.string().uri().optional().default(""),
  events_url: Joi.string().uri().optional().default(""),
  received_events_url: Joi.string().uri().optional().default(""),
  type: Joi.string().optional().default(""),
  site_admin: Joi.boolean().optional().default(false),
  company: Joi.string().optional().default(""),
  blog: Joi.string().uri().optional().default(""),
  location: Joi.string().optional().default(""),
  hireable: Joi.boolean().optional().allow(null).default(null),
  bio: Joi.string().optional().default(""),
  twitter_username: Joi.string().optional().default(""),
  public_repos: Joi.number().optional().default(0),
  public_gists: Joi.number().optional().default(0),
  followers: Joi.number().optional().default(0),
  following: Joi.number().optional().default(0),
  name: Joi.string().optional().default(""),
  user_name: Joi.string().trim().lowercase(),
  email: Joi.string()
    .email()
    .trim()
    .lowercase()
    .optional()
    .allow(null)
    .default(null),
  password: Joi.string(),
  role: Joi.string().valid("user", "admin").default("user"),
});
