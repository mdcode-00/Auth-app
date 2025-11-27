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
  'http://localhost:5173'                    // local frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // important for cookies
  })
);

app.get("/", (req, res) => {
  res.send("HELLO WORLD")
})
app.use('/api/auth', authRouter)

const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/api/auth`)
  })
}

export default app