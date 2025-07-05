import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary }  from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
      folder: "profile",
      format: async (req, file) => "png", 
      public_id: (req, file) => file.originalname
      // allowed_formats: ['jpg', 'jpeg', 'png'],
      // transformation: [{ width: 500, height: 500, crop: "limit" }],
  }
});

  
const upload = multer({storage})
export default upload; 