const Joi = require("joi");
const User = require("./user.model");
const Boom = require("@hapi/boom");
const { updateUserSchema } = require("./user.validation");

// get all users
const grtAllUsers = async (request, h) => {
  const users = await User.find();
  return h
    .response({
      message: "users fetched successfully",
      data: users,
      status: 200,
      error: null,
    })
    .code(200);
};

// get user by user name
const getUserByName = async (request, h) => {
  const user = await User.findOne({ user_name: request.params.user_name });
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
};

// get user by admin
const getUserByAdmin = async (request, h) => {
  const user = await User.findOne({ user_name: request.params.user_name });
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
};

module.exports = {
  grtAllUsers,
  getUserByName,
  getUserByAdmin,
};
