import express from 'express'
import dbConnect from './config/db.js';
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config();


const app = express();

await dbConnect();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: [
    "https://auth-app-eight-gold.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
}))

// ✅ FIX 2: Manually handle preflight (important for Vercel)
app.options('*', cors({
  origin: [
    "https://auth-app-eight-gold.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
}))

app.use('/api/auth', authRouter)

const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/api/auth`)
  })
}

export default app