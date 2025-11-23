import { Request, Response } from "express";
import { userCredsValidationSchema, userOnboardingSchema, userValidationSchema } from "../validations/user";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { env } from "../validations/env";
import { CONSTANTS } from "../lib/constants";
import { upsertStreamUsers } from "../lib/stream";

async function signup(req: Request, res: Response) {
    try {
        const userData = await userValidationSchema.parseAsync(req.body);
        // check if user already exists
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            return res.status(409).json({ message: `User already exists with ${userData.email}`, success: false });
        }
        // else create the user in db and as well as in STREAM
        const user = await User.create(userData);
        await upsertStreamUsers([
            {
                id: user._id.toString(),
                name: user.fullName,
                image: user.profilePicture,
            }
        ]);
        // create a jwt token
        const token = jwt.sign({ id: user._id }, env.JWT_SECRET, { expiresIn: CONSTANTS.JWT_EXPIRATION });
        // set cookie
        res.cookie("jwt", token, { ...CONSTANTS.COOKIE_OPTIONS });
        const _user: Partial<IUser> = user.toObject();
        // remove password before sending response to client
        delete _user["password"];
        return res.status(201).json({ message: "User created successfully", data: _user, success: true });
    } catch (error) {
        // throw error as error middleware will handle it 
        throw error;
    }

}

async function login(req: Request, res: Response) {
    try {
        const userCreds = userCredsValidationSchema.parse(req.body);
        // explicitly select password field, as we have disabled password query by default inside User model
        const user = await User.findOne({ email: userCreds.email }).select("+password");
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password", success: false });
        }
        const isPasswordCorrect = await user.comparePassword(userCreds.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid email or password", success: false });
        }
        // create a jwt token
        const token = jwt.sign({ id: user._id }, env.JWT_SECRET, { expiresIn: CONSTANTS.JWT_EXPIRATION });
        // set cookie
        res.cookie("jwt", token, { ...CONSTANTS.COOKIE_OPTIONS });
        const _user: Partial<IUser> = user.toObject();
        // remove password before sending response to client
        delete _user["password"]
        return res.status(200).json({ message: "User logged in successfully", data: _user, success: true });
    } catch (error) {
        // throw error as error middleware will handle it 
        throw error;
    }
}

function logout(req: Request, res: Response) {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "User logged out successfully", success: true });
}

async function onboarding(req: Request, res: Response) {
    try {
        const user = req.user as IUser;
        const onboardingData = userOnboardingSchema.parse(req.body);
        // update the user inside db
        const updatedUser = await User.findByIdAndUpdate(user._id, { ...onboardingData, isOnboarded: true }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        // update the user inside stream
        await upsertStreamUsers([
            {
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePicture,
            }
        ]);
        return res.status(200).json({ message: "User onboarded successfully", data: updatedUser, success: true });
    } catch (error) {
        // throw error as error middleware will handle it 
        throw error;
    }
}

async function getCurrentUser(req: Request, res: Response) {
    return res.status(200).json({ message: "User fetched successfully", data: req.user, success: true });
}

const AuthController = {
    signup,
    login,
    logout,
    onboarding,
    getCurrentUser
}

export default AuthController