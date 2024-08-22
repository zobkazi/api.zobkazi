// src/api/modules/auth/auth.controller.js
const { loginSchema, signupSchema } = require("./auth.validate");
const User = require("../user/user.model");
const Boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const SALT_ROUNDS = 10;

const authController = [
  {
    method: "POST",
    path: "/auth/signup",
    options: {
      validate: {
        payload: signupSchema,
        failAction: (request, h, error) => {
          throw Boom.badRequest(error.message);
        },
      },
    },
    handler: async (request, h) => {
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
    },
  },
  {
    method: "POST",
    path: "/auth/signin",
    options: {
      validate: {
        payload: loginSchema,
        failAction: (request, h, error) => {
          throw Boom.badRequest(error.message);
        },
      },
    },
    handler: async (request, h) => {
      try {
        // Validate request payload
        const payload = await loginSchema.validateAsync(request.payload);
        if (payload.error) {
          throw Boom.badRequest(payload.error.message);
        }

        // Check if user exists
        const user = await User.findOne({ email: payload.email });
        if (!user) {
          throw Boom.badRequest("Invalid email or password");
        }

        // Compare passwords

        console.log("user", user);

        // Generate JWT token
        const token = jwt.sign(
          {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
          JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );

        return h
          .response({
            message: "Login successful",
            data: { token },
            success: true,
            status: 200,
            error: null,
          })
          .code(200);
      } catch (error) {
        throw Boom.badRequest(error.message);
      }
    },
  },
];

module.exports = authController;
