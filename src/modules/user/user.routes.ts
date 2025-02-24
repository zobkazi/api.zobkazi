import { Router } from "express";
import verifyToken from "../auth/auth.middleware";
import {} from './user.controller'

const userRoutes = Router();

userRoutes.get("/", verifyToken, );


export default userRoutes;