import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';

dotenv.config();

const app = express();
const post = process.env.PORT || 5000;



app.listen(post, () => {
    connectDb();
    console.log(`Server is running on port ${post}`);
});



