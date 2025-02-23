const User = require("../user/user.model");
const bcrypt = require("bcryptjs");
const Boom = require("@hapi/boom");
const SALT_ROUNDS = 10;
const Jwt = require('@hapi/jwt');
const { mongoose } = require("mongoose");


// Register new user
const registerUser = async (userData) => {
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

// Login user
const loginUser = async (credentials) => {
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

     // Create token payload
     const tokenPayload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    // Generate JWT token
    const token = Jwt.token.generate(
      tokenPayload,
      process.env.JWT_SECRET || 'your-secret-key',
      {
        expiresIn: '4h'
      }
    );

    return { 
      user: tokenPayload, 
      token 
    };
    
  } catch (error) {
    throw Boom.badRequest(error.message);
  }
};



// Delete user services
const deleteUser = async (userId) => {
  try {
    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw Boom.badRequest("Invalid user ID format");
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw Boom.notFound("User not found");
    }
    return deletedUser;
  } catch (error) {
    throw Boom.badRequest(error.message);
  }
};



module.exports = {
  registerUser,
  loginUser,
  deleteUser
};