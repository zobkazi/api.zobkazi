import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel, IUser } from "./auth.model";

export class AuthService {
  static async registerUser(userData: IUser) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new UserModel({ ...userData, password: hashedPassword });
    await user.save();
    return user;
  }

  static async loginUser(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return { user, token };
  }
}
