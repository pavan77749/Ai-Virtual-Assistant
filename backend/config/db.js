import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDb = () => {
    try {
        mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log('MongoDB connection failed', error.message);
    }
};
export default connectDb;