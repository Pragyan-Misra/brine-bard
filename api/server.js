import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import aiRouter from './ai.js';
const authRouter = require('./auth.js');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/ai', aiRouter);
app.use('/api', authRouter);

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
