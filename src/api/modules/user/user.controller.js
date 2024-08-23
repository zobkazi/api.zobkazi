const Joi = require("joi");
const User = require("./user.model");
const Boom = require("@hapi/boom");
const { updateUserSchema } = require("./user.validation");

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
          status: 200,
          error: null,
        })
        .code(200);
    },
  },
  // get user by user name

  {
    method: "GET",
    path: "/user/{user_name}",
    options: {
      validate: {
        failAction: (request, h, error) => {
          throw Boom.badRequest(error.message);
        },
      },
    },
    // get user by user_name
    handler: async (request, h) => {
      const user = await User.findOne({ user_name: request.params.user_name });

      console.log("user", user);

      if (!user) {
        throw Boom.notFound("user not found");
      }
      return h
        .response({
          message: "user fetched successfully",
          data: user,
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

  // update user by id
  {
    method: "PATCH",
    path: "/users/update/{id}",
    options: {
      validate: {
        params: Joi.object({
          id: Joi.string()
            .required()
            .description("the id of the user to update"),
        }),
        payload: updateUserSchema,
        failAction: async (request, h, err) => {
          throw Boom.badRequest(`Validation error: ${err.message}`);
        },
      },
      handler: async (request, h) => {
        const { id } = request.params;
        const updates = request.payload;

        console.log("User id is", id);

        try {
          const user = await User.findById(id);

          if (!user) {
            throw Boom.notFound("User not found");
          }

          Object.assign(user, updates);
          await user.save();

          return h
            .response({ message: "User updated successfully", user })
            .code(200);
        } catch (error) {
          if (error.isBoom) {
            return error;
          }
          return Boom.badImplementation("Failed to update user");
        }
      },
      description: "Update a user by ID",
      notes:
        "This endpoint updates a user's information based on the provided ID",
      tags: ["api", "users"],
    },
  },
];

module.exports = userController;
