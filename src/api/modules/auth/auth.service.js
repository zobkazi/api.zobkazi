// /src/api/modules/auth/auth.service.js

const User = require("../user/user.model");
const bcrypt = require("bcryptjs");
const Basic = require("@hapi/basic");
const Boom = require("@hapi/boom");

const SALT_ROUNDS = 10;

// Service for user signup
const signupUser = async (userData) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw Boom.badRequest("User already exists");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(userData.password, salt);

    // Create new user
    const user = new User({
      ...userData,
      password: hash,
    });

    // Save user to database
    await user.save();

    return user;
  } catch (error) {
    throw Boom.badRequest(error.message);
  }
};

// Service for user signin
const signinUser = async (credentials) => {
  try {
    // Check if user exists
    const user = await User.findOne({ email: credentials.email });
    if (!user) {
      throw Boom.unauthorized("Invalid email or password");
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(credentials.password, user.password);
    if (!isMatch) {
      throw Boom.unauthorized("Invalid email or password");
    }

    // Create a user object excluding the password
    const userWithoutPassword = {
      ...user._doc,
      password: undefined, // Exclude the password field
    };

    // Generate JWT token
    const token = Buffer.from(JSON.stringify(userWithoutPassword)).toString(
      "base64"
    );

    return { user, token };
  } catch (error) {
    throw Boom.badRequest(error.message);
  }
};

//  Service for logOut
const logOutService = async () => {};

// Export services
module.exports = { signupUser, signinUser, logOutService };
