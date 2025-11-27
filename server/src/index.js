import express from 'express'
import dbConnect from './config/db.js';
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.js'
import cookeiParser from 'cookie-parser'
import cors from 'cors'

dotenv.config();


const app = express();

await dbConnect();

app.use(express.json());
app.use(cookeiParser());
app.use(cors({
  origin: "https://auth-app-eight-gold.vercel.app",
  credentials: true
}))


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