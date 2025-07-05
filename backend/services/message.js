import Message from "../models/message.js";
import Conversation from "../models/conversation.js";

const sendmessage =  async(senderid, receiverid, message)=>{
    const newmessage = await Message.create({senderid, receiverid, message})

    let conversation = await Conversation.findOne({
        members:{
            $all:[senderid, receiverid],
            $size: 2
        },
    });

    if(conversation){
        conversation = await Conversation.findByIdAndUpdate(
            conversation._id,
            {
                $push: { message: newmessage._id}
            },
            { new: true }
        );
    }else{
        conversation = await Conversation.create({
            members: [senderid, receiverid],
            message: [newmessage._id]
        });
    }
    return newmessage;
}

const getmessage = async(senderid, reciverid)=>{
    const conversation = await Conversation.findOne({
        members:{
            $all: [senderid, reciverid]
        }
    }).populate('message')
    if(!conversation){
        const newconversation = await Conversation.create({
            members: [senderid, reciverid],
        });
        return { message: "Conversation created successfully",newconversation}
    };
    return {conversation}
}

const deletemessage = async(messageid)=>{
    const message = await Message.findById(messageid);
    if (!message) {
        throw new Error('Message not found');
    }

    await Conversation.updateMany(
        { message: messageid },
        { $pull: { message: messageid } }
    );

    await Message.findByIdAndDelete(messageid);

    return { message: "Message deleted successfully" };
}

const updatestatus = async(messageid, status)=>{
    return await Message.findByIdAndUpdate(messageid, {status}, {new: true});
}

export default {sendmessage, getmessage, deletemessage, updatestatus}