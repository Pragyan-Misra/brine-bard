import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import aiRouter from './ai.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const authRouter = require('./auth/index.js');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'https://b9383388-0541-4618-bba6-bbff260b05f0.sandbox.lovable.dev'],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/ai', aiRouter);
app.use('/api', authRouter);

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`✅ API server running on http://localhost:${PORT}`);
  console.log(`🤖 Gemini API Key: ${process.env.GEMINI_API_KEY ? 'Loaded' : 'Missing'}`);
});
