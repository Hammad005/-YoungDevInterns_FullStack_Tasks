import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnect from './config/db.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 8080

app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
  );
app.use(express.json());
app.use(cookieParser());


import authRoute from './routes/authRoute.js'
import schoolRoute from './routes/schoolRoute.js'
import staffRoute from './routes/staffRoute.js'

app.use('/api/auth', authRoute);
app.use('/api/school', schoolRoute);
app.use('/api/staff', staffRoute);

app.listen(PORT, () => {
    dbConnect();
    console.log('Server is running on port' + PORT);
});