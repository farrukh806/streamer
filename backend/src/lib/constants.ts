import { CookieOptions } from "express";
import { env } from "../validations/env";

export const CONSTANTS = {
    JWT_EXPIRATION: "7d",
    COOKIE_OPTIONS: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        sameSite: "strict",
        secure: env.NODE_ENV === "production"
    } as CookieOptions

} as const