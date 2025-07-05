import createtokenandsavecookie from "../middlewares/jwt.js";
import User from "../services/user.js";

const registeruser = async(req,res)=>{
    const {name, email, password} = req.body;
    const profile = req.file;
    try {
        const newuser = await  User.registeruser(name, email, password, profile);
        const token= createtokenandsavecookie(newuser._id, res)
        res.status(201).json({message:"User registered successfully", user:newuser, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

const loginuser = async(req,res)=>{
    const {email, password} = req.body;
    try {
        const user = await User.loginuser(email, password);
        const token = createtokenandsavecookie(user._id, res)

        res.status(200).json({user:user, token:token})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const getuser = async(req,res)=>{
    try {
        const user = await User.getuser();
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}



export default {registeruser, loginuser, getuser};