import { StreamChat, UserResponse } from "stream-chat";
import { env } from "../validations/env";

const streamClient = StreamChat.getInstance(env.STREAM_APP_KEY, env.STREAM_APP_SECRET);

export const upsertStreamUsers = async (userData: UserResponse[]) => {
    try {
        await streamClient.upsertUsers(userData);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const generateStreamToken = (userId: string) => {
    
}