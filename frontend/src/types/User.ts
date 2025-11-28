export interface IUser {
    fullName: string;
    email: string;
    password: string;
    bio: string;
    profilePicture: string;
    nativeLanguage: string;
    learningLanguage: string;
    isOnboarded: boolean;
    friends: Array<string>
    _id: string;
}

export interface IFriendRequest {
    _id: string;
    sender: string | IUser;
    recipient: string | IUser;
    status: "pending" | "accepted" | "rejected";
    createdAt: string;
    updatedAt: string;
}