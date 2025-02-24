import { Router } from "express";
import verifyToken from "../auth/auth.middleware";
import {
  getUsersController,
  getUserByIdController,
  getUserByUserNameController,
  deleteUserController,
  updateUserController
} from "./user.controller";

const userRoutes = Router();

// Get all users (with pagination)
userRoutes.get("/", getUsersController);


// Get user by username
userRoutes.get("/:username", getUserByUserNameController);

// Update user
userRoutes.put("/:id", verifyToken, updateUserController);

// Delete user
userRoutes.delete("/:id", verifyToken, deleteUserController);

export default userRoutes;
