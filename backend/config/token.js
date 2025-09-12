import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateToken = async (userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return token;
    } catch (error) {
        throw new Error("Token generation failed");
    }
};

export default generateToken;