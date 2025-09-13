import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();


const uploadOnCloudinary = async(file) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    try {
        const result = await cloudinary.uploader.upload(file, { folder: "aivisual" });
        fs.unlinkSync(file);
        return {
            url: result.secure_url,
            public_id: result.public_id,
        };
    } catch (error) {
        fs.unlinkSync(file);
        throw new Error("Image upload failed");
    }
};

export default uploadOnCloudinary;