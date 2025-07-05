import Message from "../services/message.js";

const sendmessage = async(req,res)=>{
    const {senderid, receiverid, message} = req.body;
    if(!senderid || !receiverid || !message){
        return res.status(400).json({
            message: `${!senderid ? "senderid" : !receiverid ? "receiverid" : "message"} is required.`
        })
    }
    try {
        const newmessage = await Message.sendmessage(senderid, receiverid, message);
        res.status(201).json(newmessage);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const getmessage = async(req,res)=>{
    const {senderid, receiverid}= req.body;
    if(!senderid || !receiverid){
        return {
            message: `${senderid ? "senderid" : "reciverid"} is required`
        }
    }
    try {
        const getMessage = await Message.getmessage(senderid, receiverid);
        res.status(201).json(getMessage);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deletemessage = async(req,res)=>{
    try {
        const {messageid} = req.params;
        const deleteMessage = await Message.deletemessage(messageid);
        res.status(200).json(deleteMessage);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

const updatestatus = async(req,res)=>{
    try {
        const {messageid} = req.params;
        const {status} = req.body;
        const update = await Message.updatestatus(messageid,status);
        res.status(200).json(update);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

export default {sendmessage, getmessage, deletemessage, updatestatus};