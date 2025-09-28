import User from '../models/auth.model.js';
import uploadOnCloudinary from '../config/cloudinary.js';  
import fs from 'fs';
import path from 'path';


const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export const getUsers = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


export const updateAssistant = async (req, res) => {
    try {
        const { assistantName, imageUrl } = req.body;
        let assistantImage = null;
        
        console.log("Updating assistant:", { assistantName, imageUrl });
        console.log("File received:", req.file);
        
        
        if (req.file) {
            try {
                console.log("File path:", req.file.path);
                if (!fs.existsSync(req.file.path)) {
                    console.error("File does not exist:", req.file.path);
                    return res.status(400).json({
                        message: "File not found: " + req.file.path
                    });
                }
                
                const result = await uploadOnCloudinary(req.file.path);
                if (result && result.url) {
                    assistantImage = result.url;
                    console.log("Image uploaded to cloudinary:", assistantImage);
                
                }
            } catch (cloudinaryError) {
                console.error("Cloudinary upload error:", cloudinaryError);
                return res.status(500).json({
                    message: "Failed to upload image to cloud storage"
                });
            }
        } else if (imageUrl) {
            
            assistantImage = imageUrl;
        }
        
        const updateData = {};
        if (assistantName) updateData.assistantName = assistantName;
        if (assistantImage) updateData.assistantImage = assistantImage;
        
        // Update user
        const user = await User.findByIdAndUpdate(
            req.userId,
            updateData,
            { new: true }
        ).select("-password");
        
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        return res.status(200).json({
            message: "Assistant updated successfully",
            user
        });
    } catch (error) {
        console.error("Update assistant error:", error);
        res.status(500).json({
            message: 'Update Assistant failed',
            error: error.message
        });
    }
};