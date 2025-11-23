import { Request, Response } from "express";
import { userValidationSchema } from "../validations/user";
import jwt from "jsonwebtoken"
import User from "../models/User";
import { env } from "../validations/env";

export async function signup(req: Request, res: Response) {
    try {
        const userData = await userValidationSchema.parseAsync(req.body);
        // check if user already exists
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error(`User already exists with ${userData.email}`);
        }
        // else create the user in db and as well as in STREAM
        const user = await User.create(userData);
        // create a jwt token
        const token = jwt.sign({ id: user._id }, env.JWT_SECRET, { expiresIn: "7d" });
        // set cookie
        res.cookie("jwt", token, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict", secure: env.NODE_ENV === "production" });
        return res.status(201).json({ message: "User created successfully", data: user, success: true });
    } catch (error) {
        // throw error as error middleware will handle it 
        throw error;
    }

}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
    } catch (error) {

    }
}

export function logout(req: Request, res: Response) {
    res.send("Logout")
}
