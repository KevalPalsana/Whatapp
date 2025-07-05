import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderid:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverid:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message:
    {
        type: String,
        required: true
    },
    timestamp:
    {
        type:Date,
        default:Date.now
    },
    status: 
    { 
        type: String, 
        enum: ['sent', 'delivered', 'seen'], 
        default: 'sent' 
    },
},{timestamps: true});

export default mongoose.model('Message', messageSchema);