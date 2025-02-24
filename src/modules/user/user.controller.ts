import { Request, Response, NextFunction } from "express";
import User from "./user.model";
import {UserSchema} from './user.validation'
import {getUserByUserNameServices} from './user.services'



export const getUserByUserNameController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getUserByUserNameServices(req.params.username)

        if (!user) {
            throw new Error("User not found. Please try again.");
          }
          res.status(200).json({
            success: true,
            data: user,
          })
    } catch (error) {
        next(error)
    }
}

//update


//delete

//getbyid services