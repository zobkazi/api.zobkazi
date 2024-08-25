const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    max: {
      length: 32,
      message: "name can not be more than 32 characters",
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    max: {
      length: 32,
      message: "email can not be more than 32 characters",
    },
  },
  password: {
    type: String,
    required: true,
    max: {
      length: 32,
      message: "password can not be more than 32 characters",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
