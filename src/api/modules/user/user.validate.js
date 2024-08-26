const Joi = require("joi");

exports.updateUserSchema = Joi.object({
  name: Joi.string().optional().default(""),
  role: Joi.string().valid("user", "admin").default("user"),
  gravatar_url: Joi.string().optional().default(""),
  html_url: Joi.string().optional().default(""),
  organizations_url: Joi.string().optional().default(""),
  organizations_name: Joi.string().optional().default(""),
  bio: Joi.string().optional().default(""),
  location: Joi.string().optional().default(""),
  linkdin_url: Joi.string().optional().default(""),
  github_url: Joi.string().optional().default(""),
  gitlab_url: Joi.string().optional().default(""),
  x_url: Joi.string().optional().default(""),
});
