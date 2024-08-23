const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

const userSchema = new mongoose.Schema(
  {
    login: { type: String },
    node_id: { type: String },
    avatar_url: { type: String },
    gravatar_id: { type: String, default: "" },
    url: { type: String, default: "" },
    html_url: { type: String, default: "" },
    followers_url: { type: String, default: "" },
    following_url: { type: String, default: "" },
    gists_url: { type: String, default: "" },
    starred_url: { type: String, default: "" },
    subscriptions_url: { type: String, default: "" },
    organizations_url: { type: String, default: "" },
    repos_url: { type: String, default: "" },
    events_url: { type: String, default: "" },
    received_events_url: { type: String, default: "" },
    type: { type: String, default: "" },
    site_admin: { type: Boolean, default: false },
    user_name: {
      type: String,
      default: "",
      lowercase: true,
      trim: true,
      max: 50,
      min: 3,
      unique: true,
      sparse: true,
      set: function (value) {
        return value
          .toLowerCase()
          .trim()
          .replace(/[^a-zA-Z0-9]/g, "");
      },
      company: { type: String, default: "", trim: true },
      blog: { type: String, default: "" },
      location: { type: String, default: "" },
      email: { type: String, default: null },
      hireable: { type: Boolean, default: null },
      bio: { type: String, default: "" },
      twitter_username: { type: String, default: "" },
      public_repos: { type: Number, default: 0 },
      public_gists: { type: Number, default: 0 },
      followers: { type: Number, default: 0 },
      following: { type: Number, default: 0 },
      name: { type: String, required: true, trim: true },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      password: { type: String, required: true, trim: true },
      role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        trim: true,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Hash the password before saving to database
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password with hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
