// src/api/modules/user/user.controller.js
const Boom = require("@hapi/boom");

const {
  getUserByNameService,
  getUsersService,
  updateUserService
} = require("./user.service");

// Update user controller
const updateUserController = async (request, h) => {
  try {
    const userId = request.params.id;
    const payload = request.payload;
    
    // Call the updateUserService which includes Joi validation and update logic
    const updatedUser = await updateUserService(userId, payload);
    
    return h.response({
      message: "User updated successfully",
      data: updatedUser,
      success: true,
      status: 200,
      error: null,
    }).code(200);
  } catch (error) {
    throw Boom.badRequest(error.message);
  }
};



// Get all users controller with pagination
const getAllUsersController = async (request, h) => {
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
    const { users, totalCount } = await getUsersService(pageNumber, limitNumber);
    
    // Generate pagination links
    const totalPages = Math.ceil(totalCount / limitNumber);
    const nextPage = pageNumber < totalPages ? pageNumber + 1 : null;
    const prevPage = pageNumber > 1 ? pageNumber - 1 : null;

    return h.response({
      success: true,
      status: 200,
      message: "Users fetched successfully",
      pagination: {
        totalCount,
        totalPages,
        currentPage: pageNumber,
        nextLink: nextPage ? `/users?page=${nextPage}&limit=${limitNumber}` : null,
        prevLink: prevPage ? `/users?page=${prevPage}&limit=${limitNumber}` : null,
      },
      data: users,
      error: null,
    }).code(200);
  } catch (error) {
    throw Boom.badRequest(error.message);
  }
};

// Get user by name controller
const getUserByNameController = async (request, h) => {
  try {
    const { username } = request.params;
    const user = await getUserByNameService(username);
    
    return h.response(user).code(200);
  } catch (error) {
    throw Boom.badRequest(error.message);
  }
};

// Get user by admin controller
const getUserByAdminController = async (request, h) => {
  try {
    const { role } = request.auth.credentials;
    
    // Ensure only admins can access this route
    if (role !== "admin") {
      throw Boom.forbidden("Access denied. Admins only.");
    }

    const user = await getUserByNameService(request.params.name);

    return h.response({
      message: "User fetched successfully",
      data: user,
      success: true,
      status: 200,
      error: null,
    }).code(200);
  } catch (error) {
    throw Boom.badRequest(error.message);
  }
};

module.exports = {
  getAllUsersController,  // Fixed the typo in the name
  getUserByNameController,
  getUserByAdminController,
  updateUserController,
};