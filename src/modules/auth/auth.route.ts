import { Router } from "express";
import { 
    loginController, 
    registerController, 
    logoutController, 
    deleteUserController 
} from "./auth.controller";
import authMiddleware from "./auth.middleware";

const AuthRouter = Router();

// Public Routes
AuthRouter.post("/register", registerController);
AuthRouter.post("/login", loginController);

// Protected Routes
AuthRouter.post("/logout", authMiddleware, logoutController);
AuthRouter.delete("/delete", authMiddleware, deleteUserController);

export default AuthRouter;
