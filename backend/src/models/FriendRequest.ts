import mongoose from "mongoose";


interface IFriendRequest extends mongoose.Document {
    sender: mongoose.Types.ObjectId;
    recipient: mongoose.Types.ObjectId;
    status: "pending" | "accepted" | "rejected";
}
const friendRequestSchema = new mongoose.Schema<IFriendRequest>({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    },
}, {
    timestamps: true
});

const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);

export default FriendRequest;