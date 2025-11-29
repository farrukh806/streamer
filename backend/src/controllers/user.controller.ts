import { Request, Response } from "express";
import User from "../models/User";
import FriendRequest from "../models/FriendRequest";
import mongoose from "mongoose";
import { friendRequestValidationSchema } from "../validations/friendRequest";

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

async function sendFriendRequest(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const currentUserId = req.user._id;
        // find user by id
        const recipient = await User.findById(id);
        // check if user exists
        if (!recipient) {
            return res.status(404).json({ message: "Recipient not found", success: false });
        }
        // check if user id is same as current user id
        if (currentUserId.equals(id)) {
            return res.status(400).json({ message: "You cannot send a friend request to yourself", success: false });
        }
        // check if user is already friends with the current user
        if (recipient.friends.includes(currentUserId)) {
            return res.status(400).json({ message: "You are already friends with this user", success: false });
        }
        // check if the request already exists
        const existingRequest = await FriendRequest.findOne({ $or: [{ sender: currentUserId, recipient: id }, { sender: id, recipient: currentUserId }] });
        if (existingRequest) {
            return res.status(400).json({ message: "Friend request already exists", success: false });
        }
        // create friend request
        const friendRequest = await FriendRequest.create({
            sender: currentUserId.toString(),
            recipient: id,
        });

        return res.status(200).json({ message: "Friend request sent successfully", success: true, data: friendRequest });
    } catch (error) {
        // throw error as error middleware will handle it 
        throw error;
    }
}

async function updateFriendRequestStatus(req: Request, res: Response) {
    try {
        const { id: friendRequestId } = req.params;
        const { status } = friendRequestValidationSchema.parse(req.body);
        const currentUserId = req.user._id;
        // find friend request by id
        const friendRequest = await FriendRequest.findById(friendRequestId);
        // check if friend request exists
        if (!friendRequest) {
            return res.status(404).json({ message: "Friend request not found", success: false });
        }
        // check if user is authorize to update request status
        if (!friendRequest.recipient.equals(currentUserId)) {
            return res.status(403).json({ message: "You are not authorized to accept or reject this friend request", success: false });
        }
        // update friend request
        friendRequest.status = status;
        let message = "Friend request rejected successfully";
        // if status is accepted then push it to the friends array of both users
        if (status === "accepted") {
            await User.findByIdAndUpdate(friendRequest.sender, { $addToSet: { friends: friendRequest.recipient } });
            await User.findByIdAndUpdate(friendRequest.recipient, { $addToSet: { friends: friendRequest.sender } });
            message = "Friend request accepted successfully";
        }
        // if status is rejected then we do not have to do anything as the request was not inserted into User model
        // save the request
        await friendRequest.save();
        return res.status(200).json({ message, success: true });
    } catch (error) {
        // throw error as error middleware will handle it 
        throw error;
    }
}

async function getFriendRequests(req: Request, res: Response) {
    try {
        const currentUserId = req.user._id;
        const { type = 'sent' } = req.query;
        // type can be 'sent' or 'incoming'
        const isSent = type === 'sent';
        // find friend requests where current user is the sender (if type=sent) or recipient (if type=incoming)
        // find friend requests where current user is the sender (if type=sent) or recipient (if type=incoming)
        // If type is sent, we want to see all requests (pending, accepted, rejected)
        // If type is incoming, we only want to see pending requests
        const query = isSent ? { sender: currentUserId } : { recipient: currentUserId, status: "pending" };
        const friendRequests = await FriendRequest.find(query)
            .populate(isSent ? "recipient" : "sender", "fullName profilePicture learningLanguage nativeLanguage");
        return res.status(200).json({ message: "Friend requests fetched successfully", data: friendRequests, success: true });
    } catch (error) {
        // throw error as error middleware will handle it 
        throw error;
    }
}

const UserController = {
    getRecommendedUsers,
    getFriends,
    sendFriendRequest,
    updateFriendRequestStatus,
    getFriendRequests,
}

export default UserController