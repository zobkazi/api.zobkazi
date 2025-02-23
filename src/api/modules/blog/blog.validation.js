const Joi = require("joi");

exports.createBlogSchema = Joi.object({
  slug: Joi.string().required(),
  content: Joi.string().required(),
});
