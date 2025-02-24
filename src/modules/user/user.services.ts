import User from "./user.model";



//getBy_username services
export const getUserByUserNameServices = async (username: string) => {
    const user = await User.findOne(username)

    if (!user) {
        throw new Error("User not found");
      }
      return user;
}


//getbyid services

// update user  services

// delete user services