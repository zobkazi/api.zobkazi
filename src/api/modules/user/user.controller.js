const User = require("./user.model");
const Boom = require("@hapi/boom");
const { updateUserSchema } = require("./user.validate");
const { updateUserService, getUsersService } = require("./user.service");
const { checkAdminRole } = require("../../../plugins/checkAdminRole");

// Update user controller
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

    // Call service to update the user
    const user = await updateUserService(userId, payload);

    return h
      .response({
        message: "User updated successfully",
        data: {
          ...user._doc,
          password: undefined,
          email: undefined,
        },
        success: true,
        status: 200,
        error: null,
      })
      .code(200);
  } catch (error) {
    throw Boom.badRequest(error.message);
  }
};

// Get all users controller with pagination
const grtAllUsers = async (request, h) => {
  try {
    // Get pagination parameters
    const { page = 1, limit = 10 } = request.query;

    // Validate page and limit
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (isNaN(pageNumber) || pageNumber < 1) {
      throw Boom.badRequest("Invalid page number");
    }
    if (isNaN(limitNumber) || limitNumber < 1) {
      throw Boom.badRequest("Invalid limit number");
    }

    // Call service to get paginated users
    const { users, totalCount } = await getUsersService(
      pageNumber,
      limitNumber
    );

    // Generate pagination links
    const totalPages = Math.ceil(totalCount / limitNumber);
    const nextPage = pageNumber < totalPages ? pageNumber + 1 : null;
    const prevPage = pageNumber > 1 ? pageNumber - 1 : null;

    return h
      .response({
        success: true,
        status: 200,
        message: "Users fetched successfully",
        pagination: {
          totalCount,
          totalPages,
          currentPage: pageNumber,
          nextLink: nextPage
            ? `/users?page=${nextPage}&limit=${limitNumber}`
            : null,
          prevLink: prevPage
            ? `/users?page=${prevPage}&limit=${limitNumber}`
            : null,
        },
        data: {
          users,
          password: undefined,
          email: undefined,
        },
        error: null,
      })
      .code(200);
  } catch (error) {
    throw Boom.badRequest(error.message);
  }
};

// Get user by name controller
const getUserByName = async (request, h) => {
  try {
    const user = await User.findOne({ user_name: request.params.user_name });
    if (!user) {
      throw Boom.notFound("User not found");
    }
    return h
      .response({
        message: "User fetched successfully",
        data: {
          ...user._doc,
          password: undefined,
          email: undefined,
        },
        success: true,
        status: 200,
        error: null,
      })
      .code(200);
  } catch (error) {
    throw Boom.badRequest(error.message);
  }
};

// Get user by admin controller
const getUserByAdmin = async (request, h) => {
  try {
    const { role } = request.auth.credentials;

    // Ensure only admins can access this route
    if (role !== "admin") {
      throw Boom.forbidden("Access denied. Admins only.");
    }

    const user = await User.findOne({ name: request.params.name });
    if (!user) {
      throw Boom.notFound("User not found");
    }

    return h
      .response({
        message: "User fetched successfully",
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

module.exports = {
  grtAllUsers,
  getUserByName,
  getUserByAdmin,
  updateUser,
};
