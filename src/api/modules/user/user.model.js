const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
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
