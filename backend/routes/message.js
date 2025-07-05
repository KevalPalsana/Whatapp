import express from "express";
import Message from "../controllers/message.js";

const router = express.Router();

router.post('/send', Message.sendmessage);
router.post('/get', Message.getmessage);
router.delete('/delete/:messageid', Message.deletemessage);
router.put('/update/:messageid', Message.updatestatus);


export default router;