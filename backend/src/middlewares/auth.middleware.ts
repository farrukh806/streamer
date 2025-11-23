import jwt from "jsonwebtoken";
import User from "../models/User";
import { NextFunction, Request, Response } from "express";
import { env } from "../validations/env";

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cookie = req.cookies.jwt;
        if (!cookie) {
            return res.status(401).json({ message: "Unauthorized - No token provided", success: false });
        }
        const decoded = jwt.verify(cookie, env.JWT_SECRET) as { id: string };
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized - Invalid token", success: false });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}   