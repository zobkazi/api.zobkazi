import mongoose from "mongoose";
import User from "./user.model";
import { UserSchema } from "./user.validation";

// Get user by username
export const getUserByUserNameServices = async (username: string) => {
    const user = await User.findOne({ username }).select("-password");
    if (!user) throw new Error("User not found");
    return user;
};

// Get user by ID
export const getUserByIdServices = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid user ID");
    
    const user = await User.findById(id).select("-password");
    if (!user) throw new Error("User not found");
    return user;
};

// Get users with pagination
export const getUsersWithPagination = async (page: number = 1, limit: number = 10) => {
    page = Math.max(page, 1);
    limit = Math.max(limit, 1);
    const skip = (page - 1) * limit;

    const [users, totalCount] = await Promise.all([
        User.find().skip(skip).limit(limit).select("-password"),
        User.countDocuments(),
    ]);

    return { users, totalCount, page, limit };
};

// Update user
export const updateUserServices = async (id: string, updateData: Partial<UserSchema>) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid user ID");
    
    const user = await User.findByIdAndUpdate(id, updateData, { new: true }).select("-password");
    if (!user) throw new Error("User not found");
    return user;
};

// Delete user
export const deleteUserServices = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid user ID");
    
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error("User not found");
    return user;
};