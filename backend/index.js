import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import userRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const post = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", userRoutes);


app.listen(post, () => {
    connectDb();
    console.log(`Server is running on port ${post}`);
});



