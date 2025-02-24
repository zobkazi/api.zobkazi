import { Router } from "express";
import { loginController, registerController } from "./auth.controller";

const AuthRouter = Router();

AuthRouter.post("/register", registerController);
AuthRouter.post("/login", loginController);




export default AuthRouter;
