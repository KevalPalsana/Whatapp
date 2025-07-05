import User from "../models/user.js"
import bcryptjs from "bcryptjs";


const registeruser = async(name, email, password, profile)=>{
    if(!name || !email || !password){
        throw new Error(`${
            !name ? 'Name' : !email ? 'Email' : "Password"} is Required`);
    }
    const existinguser = await User.findOne({email});
    if(existinguser){
        throw new Error("User already exists");
    }
    const profileImage = profile ? profile.path : 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg';
    const hashpassaword = await bcryptjs.hash(password, 10);
    const newuser = await User.create({name, email, password: hashpassaword, profile: profileImage});
    return  newuser;
}

const loginuser = async(email, password)=>{
    const user = await User.findOne({email});

    if(!user){
        throw new Error('User does not exist please register');
    };
    const ismatch = await bcryptjs.compare(password, user.password);
    if(!ismatch){
        throw new Error('invalid password');
    }
    return user;

};

const getuser = async()=>{
    return await User.find();
}

export default {registeruser, loginuser, getuser};