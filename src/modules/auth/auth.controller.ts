import { Request, Response, NextFunction } from "express";
import { loginSchema, registerSchema } from "./auth.validation";
import { loginServices, registerServices } from "./auth.services";

// registerController

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // validation data with zod
  const parsedBody = registerSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      error: parsedBody.error,
    });
  }

  try {
    const user = await registerServices(parsedBody.data);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// loginController

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // validation of request body
  const parsedBody = loginSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      error: parsedBody.error,
    });
  }

  try {
    const token = await loginServices(parsedBody.data);
    res.setHeader("Authorization", `Bearer ${token}`);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};
