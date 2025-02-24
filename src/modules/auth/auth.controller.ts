import { Request, Response } from "express";
import { AuthService } from "./auth.services";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const user = await AuthService.registerUser(req.body);
      res.status(201).json({ message: "User registered", user });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const data = await AuthService.loginUser(email, password);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
