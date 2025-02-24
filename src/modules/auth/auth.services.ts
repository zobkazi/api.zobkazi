import User from "../user/user.model";
import { TRegister, TLogin } from "./auth.validation";
import bcrypt from "bcryptjs";
import { Document } from "mongoose";
import jwt from "jsonwebtoken";

// Register Service
export const registerServices = async (data: TRegister): Promise<Document> => {
  const existingEmail = await User.findOne({ email: data.email });
  if (existingEmail) {
    throw new Error("Email already taken");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  data.password = hashedPassword;

  const user = await User.create(data);
  return user;
};

// Login Service
export const loginServices = async (data: TLogin): Promise<string> => {
  const user = await User.findOne({ email: data.email }).select("+password");
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

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

// Logout Service
export const logoutServices = async () => {
  return true; // Logout logic is handled at the controller level by clearing cookies
};

// Delete User Service
export const deleteUserServices = async (userId: string) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
