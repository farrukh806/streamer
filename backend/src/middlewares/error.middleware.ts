import { NextFunction, Request, Response } from "express";
import z from "zod";

export const errorHandlerMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    if (error instanceof z.ZodError) {
        const message = error.issues.map((err: z.core.$ZodIssue) => {
            return `${err.path.join(".")}: ${err.message}`
        })
        return res.status(400).json({ error: message.join(", "), issues: error.issues, success: false });
    }
    else if (error instanceof Error) {
        return res.status(500).json({ error: error.message, success: false });
    }
    return res.status(500).json({ error: "Something went wrong", success: false });
}