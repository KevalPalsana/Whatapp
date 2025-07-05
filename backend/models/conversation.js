import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    members:
    [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required: true
        },
    ],
    message:
    [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            required: true
        }
    ],
    timestamp:
    {
        type:Date,
        default: Date.now
    }
},{timestamps: true});


export default mongoose.model("Conversation", conversationSchema);