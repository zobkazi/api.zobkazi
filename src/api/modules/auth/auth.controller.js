// src/api/modules/auth/auth.controller.js
const { signupSchema, loginSchema } = require("./auth.validate");
const { signupUser, signinUser } = require("./auth.service");
const Boom = require("@hapi/boom");
const Jwt = require("@hapi/jwt");

// Sign up controller
const signup = async (request, h) => {
  try {
    // Validate request payload
    const payload = await signupSchema.validateAsync(request.payload);
    if (payload.error) {
      throw Boom.badRequest(payload.error.message);
    }

    // Call service to handle signup
    const user = await signupUser(payload);

    return h
      .response({
        message: "User created successfully",
        data: user,
        success: true,
        status: 201,
        error: null,
      })
      .code(201);
  } catch (error) {
    throw Boom.badRequest(error.message);
  }
};

// Sign in controller
const signin = async (request, h) => {
  try {
    // Validate request payload
    const payload = await loginSchema.validateAsync(request.payload);
    if (payload.error) {
      throw Boom.badRequest(payload.error.message);
    }

    // Call service to handle signin
    const { user, token } = await signinUser(payload);

    return h
      .response({
        message: "User logged in successfully",
        data: { token },
        success: true,
        status: 200,
        error: null,
      })
      .code(200);
  } catch (error) {
    throw Boom.badRequest(error.message);
  }
};

module.exports = { signup, signin };
