import User from "../user/user.model";
import { TRegister, TLogin } from "./auth.validation";
import bcrypt from "bcryptjs";
import { Document } from "mongoose";
import jwt from "jsonwebtoken";

// Register Service
export const registerServices = async (data: TRegister): Promise<Document> => {
  // Check if email already exists
  const existingEmail = await User.findOne({ email: data.email });
  if (existingEmail) {
    throw new Error("Email already taken");
  }

  // Hash the password before saving the user
  const hashedPassword = await bcrypt.hash(data.password, 10);
  data.password = hashedPassword;

  // Create user
  const user = await User.create(data);

  return user;
};

// Login Service
export const loginServices = async (data: TLogin): Promise<string> => {
  // Check if user exists
  const user = await User.findOne({ email: data.email }).select("+password");
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Validate password
  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT token
  const secret = process.env.JWT_SECRET || "kazi";
  const expiresIn = "1d";

  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, secret, { expiresIn });
};
