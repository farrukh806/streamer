import dotenv from 'dotenv';

// Load environment variables FIRST before any other imports
dotenv.config({ quiet: true });

import express from 'express';
import cors from 'cors';
import authRouter from "./routes/auth.route"
import userRouter from "./routes/user.route"
import chatRouter from "./routes/chat.routes";
import { connectToDB } from './lib/db';
import { errorHandlerMiddleware } from './middlewares/error.middleware';
import { env } from './validations/env';
import cookieParser from "cookie-parser";

const app = express();
const PORT = env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // allow cookies
}));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  connectToDB()
  console.log(`Server is running on http://localhost:${PORT}`);
});