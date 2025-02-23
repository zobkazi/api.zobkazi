const { registerSchema, loginSchema } = require("./auth.validate");
const { 
  registerUser, 
  loginUser, 
  deleteUser
} = require("./auth.service");
const Boom = require("@hapi/boom");
const { mongoose } = require("mongoose");



// Register controller
const registerController = async (request, h) => {
  try {
    const payload = await registerSchema.validateAsync(request.payload);
    const user = await registerUser(payload);
    
    return h.response({
      message: "User registered successfully",
      success: true,
      status: 201,
      error: null,
    }).code(201);
  } catch (error) {
    throw Boom.badRequest(error.message);
  }
};

// Login controller
const loginController = async (request, h) => {
  try {
    const payload = await loginSchema.validateAsync(request.payload);
    request.cookieAuth.set({ sessionId: payload.email });
    
    const { user, token } = await loginUser(payload);
    
    return h.response({
      message: "User logged in successfully",
      data: { user, token },
      success: true,
      status: 200,
      error: null,
    }).code(200);
  } catch (error) {
    throw Boom.badRequest(error.message);
  }
};


// Delete user controller
const deleteUserController = async (request, h) => {
  try {
    const userId = request.params.userId;

    // Check if userId is valid before proceeding
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw Boom.badRequest("Invalid user ID format");
    }

    await deleteUser(userId);
    
    return h.response({
      message: "User deleted successfully",
      success: true,
      status: 200,
      error: null,
    }).code(200);
  } catch (error) {
    return h.response({
      message: error.message,
      success: false,
      status: error.isBoom ? error.output.statusCode : 500,
      error: error.isBoom ? error.output.payload : 'Internal Server Error',
    }).code(error.isBoom ? error.output.statusCode : 500);
  }
};


// Logout controller
const logoutController = async (request, h) => {
  try {
    request.cookieAuth.clear();
    return h.response({
      message: "Logged out successfully",
      success: true,
      status: 200,
      error: null,
    }).code(200);
  } catch (error) {
    throw Boom.badRequest(error.message);
  }
};



module.exports = {
  registerController,
  loginController,
  deleteUserController,
  logoutController
};