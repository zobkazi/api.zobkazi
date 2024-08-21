const Joi = require("joi");
const User = require("./user.model");
const Boom = require("@hapi/boom");


const userController = [
  {
    method: "GET",
    path: "/users",
    handler: async (request, h) => {
      const users = await User.find();
      return h
        .response({
          message: "users fetched successfully",
          data: users,
          success: true,
          status: 200,
          error: null,
        })
        .code(200);
    },
  },
  {
    method: "POST",
    path: "/users/create",
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        }),
        failAction: (request, h, error) => {
          throw Boom.badRequest(error.message);
        },
      },
    },
    handler: async (request, h) => {
      const { name, email, password } = request.payload;
      const user = new User({ name, email, password });
      await user.save();
      return h
        .response({
          message: "user created successfully",
          data: user,
          success: true,
          status: 201,
          error: null,
        })
        .code(201);
    },
  },
];

module.exports = userController;
