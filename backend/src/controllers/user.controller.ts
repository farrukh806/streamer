import { Request, Response } from "express";
import User from "../models/User";

async function getRecommendedUsers(req: Request, res: Response) {
    try {
        const userId = req.user._id;
        // find users who are not friends with the current user and are onboarded
        const recommendedUsers = await User.find({ $and: [{ _id: { $ne: userId } }, { _id: { $nin: req.user.friends } }, { isOnboarded: true }] });
        return res.status(200).json({ message: "Recommendations fetched successfully", data: recommendedUsers, success: true });
    } catch (error) {
        // throw error as error middleware will handle it 
        throw error;
    }
}

async function getFriends(req: Request, res: Response) {
    try {
        // find friends of the current user and populate their details
        const user = await User.findById(req.user._id).select("friends").populate("friends", "fullName profilePicture learningLanguage nativeLanguage");
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        return res.status(200).json({ message: "Friends fetched successfully", data: user.friends, success: true });
    } catch (error) {
        // throw error as error middleware will handle it 
        throw error;
    }
}

const UserController = {
    getRecommendedUsers,
    getFriends,
}

export default UserController