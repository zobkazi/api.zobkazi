const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
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
    gravatar_url: {
      type: String,
      default:
        "https://1.gravatar.com/userimage/241833398/61fee49c1ae17085e881748fb4ac221e?size=600",
      min: {
        length: 10,
        message: "gravatar_url can not be less than 10 characters",
      },
      max: {
        length: 200,
        message: "gravatar_url can not be more than 200 characters",
      },
      trim: true,
    },
    html_url: {
      type: String,
      default: "https://github.com/zobkazi",
      min: {
        length: 10,
        message: "html_url can not be less than 10 characters",
      },
      max: {
        length: 200,
        message: "html_url can not be more than 200 characters",
      },
      trim: true,
    },
    organizations_url: {
      type: String,
      default: "https://api.github.com/users/zobkazi/orgs",
      min: {
        length: 10,
        message: "organizations_url can not be less than 10 characters",
      },
      max: {
        length: 200,
        message: "organizations_url can not be more than 200 characters",
      },
      trim: true,
    },
    organizations_name: {
      type: String,
      default: "kazi byte",
      min: {
        length: 3,
        message: "organizations_name can not be less than 3 characters",
      },
      max: {
        length: 30,
        message: "organizations_name can not be more than 30 characters",
      },
      trim: true,
    },
    bio: {
      type: String,
      default: "I am a student",
      max: {
        length: 200,
        message: "bio can not be more than 200 characters",
      },
      min: {
        length: 10,
        message: "bio can not be less than 10 characters",
      },
      trim: true,
    },
    location: {
      type: String,
      default: "Dhaka",
      max: {
        length: 30,
        message: "location can not be more than 30 characters",
      },
      min: {
        length: 3,
        message: "location can not be less than 3 characters",
      },
      trim: true,
    },

    linkdin_url: {
      type: String,
      default: "https://www.linkedin.com/in/zobkazi/",
      min: {
        length: 10,
        message: "linkdin_url can not be less than 10 characters",
      },
      max: {
        length: 200,
        message: "linkdin_url can not be more than 200 characters",
      },
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
