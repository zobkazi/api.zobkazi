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
  // get user by user name

  {
    method: "GET",
    path: "/users/{name}",
    options: {
      validate: {
        failAction: (request, h, error) => {
          throw Boom.badRequest(error.message);
        },
      },
    },
    // get user by user name
    handler: async (request, h) => {
      const user = await User.findOne({ name: request.params.name });

      if (!user) {
        throw Boom.notFound("user not found");
      }
      return h
        .response({
          message: "user fetched successfully",
          data: {
            name: user.name,
            email: user.email,
            role: user.role,
          },
          success: true,
          status: 200,
          error: null,
        })
        .code(200);
    },
  },
  {
    method: "GET",
    path: "/users/admin",
    options: {
      validate: {
        failAction: (request, h, error) => {
          throw Boom.badRequest(error.message);
        },
      },
    },

    handler: async (request, h) => {
      const users = await User.find({ role: "admin" });
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
];

module.exports = userController;
