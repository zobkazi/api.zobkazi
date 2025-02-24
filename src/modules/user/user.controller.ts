import { Request, Response, NextFunction } from "express";
import { getUserByUserNameServices, getUserByIdServices, updateUserServices, deleteUserServices, getUsersWithPagination } from "./user.services";



export const getUserByUserNameController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getUserByUserNameServices(req.params.username);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const getUserByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getUserByIdServices(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const getUsersController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        
        const result = await getUsersWithPagination(page, limit);
        
        res.status(200).json({
            users: result.users,
            pagination: {
                totalUsers: result.totalCount,
                currentPage: result.page,
                totalPages: Math.ceil(result.totalCount / result.limit),
                perPage: result.limit,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await updateUserServices(req.params.id, req.body);
        res.status(200).json({ success: true, message: "User updated successfully", data: user });
    } catch (error) {
        next(error);
    }
};

export const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteUserServices(req.params.id);
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};
