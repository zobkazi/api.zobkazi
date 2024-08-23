// src/api/modules/auth/auth.controller.js
const { loginSchema, signupSchema } = require("./auth.validate");
const User = require("../user/user.model");
const Boom = require("@hapi/boom");
const bcrypt = require("bcryptjs");
const SALT_ROUNDS = 10;

// Sign up controller
const signup = async (request, h) => {
  try {
    // Validate request payload
    const payload = await signupSchema.validateAsync(request.payload);
    if (payload.error) {
      throw Boom.badRequest(payload.error.message);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
      throw Boom.badRequest("User already exists");
    }
    // Hash the password
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(payload.password, salt);

    // Create new user
    const user = new User({
      name: payload.name,
      email: payload.email,
      password: hash,
    });

    // Save user to database
    await user.save();

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

    // Check if user exists
    const user = await User.findOne({ email: payload.email });
    if (!user) {
      throw Boom.unauthorized("Invalid email or password-0");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(payload.password, salt);

    console.log("Hashed password:", hash);

    // Compare passwords
    const isMatch = await bcrypt.compare(payload.password, user.password);
    if (!isMatch) {
      throw Boom.unauthorized("Invalid email or password-1");
    }

    return h
      .response({
        message: "User logged in successfully",
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

module.exports = { signup, signin };
