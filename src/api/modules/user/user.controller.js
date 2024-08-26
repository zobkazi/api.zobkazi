const User = require("./user.model");
const Boom = require("@hapi/boom");
const { updateUserSchema } = require("./user.validate");
const { updateUserService } = require("./user.service");

// update user controller
const updateUser = async (request, h) => {
  try {
    // Validate request parameters
    const { userId } = request.params;

    if (!userId) {
      throw Boom.badRequest("User ID is required");
    }

    // Validate request payload
    const payload = await updateUserSchema.validateAsync(request.payload);
    if (payload.error) {
      throw Boom.badRequest(payload.error.message);
    }

    // Check if user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      throw Boom.notFound("User not found");
    }

    // Call service to find and update the user
    const user = await updateUserService(userId, payload);

    return h
      .response({
        message: "User updated successfully",
        data: user,
        success: true,
        status: 200,
        error: null,
      })
      .code(200);
  } catch (error) {
    throw Boom.badRequest(error.message);
  }
};

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
      data: {
        user_name: user.name,
        email: user.email,
      },
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
  updateUser,
};
