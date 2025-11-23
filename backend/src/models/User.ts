import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

export interface IUser {
    fullName: string;
    email: string;
    password: string;
    bio: string;
    profilePicture: string;
    nativeLanguage: string;
    learningLanguage: string;
    isOnboarded: boolean;
    friends: Array<mongoose.Schema.Types.ObjectId>
}

const userSchema = new mongoose.Schema<IUser>({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 4
    },
    bio: {
        type: String,
        default: ""
    },
    profilePicture: {
        type: String,
        default: ""
    },
    nativeLanguage: {
        type: String,
        required: true,
    },
    learningLanguage: {
        type: String,
        required: true
    },
    isOnboarded: {
        type: Boolean,
        default: false
    },
    friends: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ]
}, { timestamps: true });

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
})

userSchema.methods.comparePassword = async function (password: string) {
    return await bcryptjs.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;
