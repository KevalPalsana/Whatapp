import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectdb = async () => {
        try {
            await mongoose.connect(process.env.MONGODB_URL).then(() => console.log('MongoDB connected'));
        } catch (error) {
            console.log(error.message);
        }
      };


export default connectdb;