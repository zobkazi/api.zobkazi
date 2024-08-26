const User = require("./user.model");
const Boom = require("@hapi/boom");

// Service for user  Update
const updateUserService = async (userId, updatedData) => {
  try {
    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      throw Boom.notFound("User not found with the given ID");
    }

    // Update the user's details
    Object.assign(user, updatedData);
    await user.save();

    return user;
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
    const users = await User.find().skip(skip).limit(limit);

    // Get total count of users
    const totalCount = await User.countDocuments();

    return { users, totalCount };
  } catch (error) {
    throw Boom.badRequest(error.message);
  }
};

module.exports = {
  updateUserService,
  getUsersService,
};
