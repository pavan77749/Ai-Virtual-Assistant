import User from '../models/auth.model.js';
import bcrypt from 'bcryptjs';
import  generateToken  from '../config/token.js';

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        const token = await generateToken(newUser._id);
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000, 
        });
        res.status(201).json({ token, user: { id: newUser._id, name: newUser.name, email: newUser.email, assistantName: newUser.assistantName, assistantAvatar: newUser.assistantAvatar, history: newUser.history } });
    } catch (error) {
        res.status(500).json({ message: "SignUp server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }   
        res.status(200).json({ user: { id: user._id, name: user.name, email: user.email, assistantName: user.assistantName, assistantAvatar: user.assistantAvatar, history: user.history } });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'Strict',
        });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Logout  error" });
    }
};