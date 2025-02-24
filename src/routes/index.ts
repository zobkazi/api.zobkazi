import { Router } from "express";
import AuthRoute from '@/modules/auth/auth.route';
import userRoutes from "@/modules/user/user.routes";
import blogRouter from "@/modules/blog/blog.routes"


const router = Router();

router.use("/auth", AuthRoute); 
router.use("/users", userRoutes)
router.use("/blogs", blogRouter)

export default router;