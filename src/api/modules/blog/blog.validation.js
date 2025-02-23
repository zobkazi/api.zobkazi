const Joi = require("joi");

const validateBlog = Joi.object({
  slug: Joi.string()
    .required()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .min(3)
    .max(100),

  content: Joi.string()
    .required()
    .min(20)
    .max(5000),

  author: Joi.string()
    .required()
    .min(3)
    .max(100),

  tags: Joi.array()
    .items(Joi.string().min(2).max(30))
    .max(10)
    .default([]),

  readTime: Joi.number()
    .min(1)
    .max(60)
    .default(0),
});

module.exports = validateBlog;
