import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const post = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
     methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(post, () => {
    connectDb();
    console.log(`Server is running on port ${post}`);
});



