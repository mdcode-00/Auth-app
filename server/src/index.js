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

const allowedOrigins = [
  'https://auth-app-eight-gold.vercel.app', // your frontend
  'http://localhost:5173'
]

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
app.set('trust proxy', 1)

app.use('/api/auth', authRouter)

const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/api/auth`)
  })
}

export default app