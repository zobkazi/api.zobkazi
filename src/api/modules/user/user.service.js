// src/api/modules/user/user.service.js
const User = require("./user.model");
const Boom = require("@hapi/boom");
const bcrypt = require("bcryptjs");
const updateUserSchema = require('./user.validate')
const Joi = require("joi");

const SALT_ROUNDS = 10;


// Update user
const updateUserService = async (userId, updateData) => {
  try {
    // Validate the update data against the schema
    const { error } = updateUserSchema.validate(updateData);
    if (error) {
      throw Boom.badRequest(error.details[0].message);  // Return validation error
    }

    // Prevent email and password update logic
    if (updateData.email) {
      delete updateData.email;  // Ensure email is not updated
    }

    if (updateData.password) {
      delete updateData.password;  // Ensure password is not updated
    }

    // If password is being updated, hash it (skip this part since password update is forbidden)
    if (updateData.password) {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    // Set the updated_at timestamp
    updateData.updated_at = Date.now();

    // Update user in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...updateData },
      { new: true }
    ).select('-password');  // Exclude password from response

    if (!updatedUser) {
      throw Boom.notFound("User not found");
    }

    return updatedUser;
  } catch (error) {
    throw Boom.badRequest(error.message);
  }
};

// Service for getting paginated users
const getUsersService = async (page, limit) => {
  try {
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    
    // Fetch paginated users
    const users = await User.find()
      .select('-password')
      .skip(skip)
      .limit(limit);
    
    // Get total count of users
    const totalCount = await User.countDocuments();
    
    return { users, totalCount };
  } catch (error) {
    throw Boom.badRequest(error.message);
  }
};

// Get user by name
const getUserByNameService = async (username) => {
  try {
    const user = await User.findOne({ username }).select('-password');
    if (!user) {
      throw Boom.notFound("User not found");
    }
    return user;
  } catch (error) {
    throw Boom.badRequest(error.message);
  }
};

module.exports = {
  updateUserService,
  getUsersService,
  getUserByNameService
};