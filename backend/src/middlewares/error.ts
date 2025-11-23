import { NextFunction, Request, Response } from "express";
import zod from "zod";

export const errorHandlerMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    if (error instanceof zod.ZodError) {
        return res.status(400).json({ error: error.message, issues: error.issues });
    }
    else if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Something went wrong" });
}