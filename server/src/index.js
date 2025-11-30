import express from 'express'
import dbConnect from './config/db.js';
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import serverless from 'serverless-http'

dotenv.config();


const app = express();

await dbConnect();

app.use(express.json());
app.use(cookieParser());

app.set('trust proxy', 1)

// CORS: allow exact frontend origin(s) and credentials
const allowedOrigins = [
  process.env.CLIENT_URL, // keep if set
  'http://localhost:5173'
].filter(Boolean)

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true) // server-to-server / tools
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With']
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

// fallback (temporary debug) — remove once CORS works
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Origin', allowedOrigins.includes(req.headers.origin) ? req.headers.origin : '')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

app.use('/api/auth', authRouter)

const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/api/auth`)
  })
}

export const handler = serverless(app)