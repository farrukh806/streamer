import express from 'express';
import dotenv from 'dotenv';
import authRouter from "./routes/auth.route"
import { connectToDB } from './lib/db';

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  connectToDB()
  console.log(`Server is running on http://localhost:${PORT}`);
});