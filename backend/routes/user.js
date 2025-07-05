import User from "../controllers/user.js";
import express from "express";
import upload from "../middlewares/multer.js";
const router = express.Router();

router.post('/register',upload.single('profile'), User.registeruser);
router.post('/login',upload.none(),User.loginuser);
router.get('/get',User.getuser);


export default router;