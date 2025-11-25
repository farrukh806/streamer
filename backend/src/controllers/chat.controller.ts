import { Request, Response } from "express";
import { generateStreamToken } from "../lib/stream"

async function getStreamToken(req: Request, res: Response) {
    try {
        // generate stream token
        const token = generateStreamToken(req.user._id.toString());
        return res.status(200).json({ message: "Stream token generated successfully", data: token, success: true });
    } catch (error) {
        // throw error as error middleware will handle it 
        throw error;
    }
}

const ChatController = {
    getStreamToken,
}

export default ChatController