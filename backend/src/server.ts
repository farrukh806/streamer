import dotenv from 'dotenv';

// Load environment variables FIRST before any other imports
dotenv.config({ quiet: true });

import express from 'express';
import authRouter from "./routes/auth.route"
import { connectToDB } from './lib/db';
import { errorHandlerMiddleware } from './middlewares/error';
import { env } from './validations/env';

const app = express();
const PORT = env.PORT;

app.use(express.json());

app.use('/api/auth', authRouter);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  connectToDB()
  console.log(`Server is running on http://localhost:${PORT}`);
});