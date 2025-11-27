import express from 'express'
import dbConnect from './config/db.js';
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.js'
import cookeiParser from 'cookie-parser'
import cors from 'cors'

dotenv.config();


const app = express();

dbConnect();

app.use(express.json());
app.use(cookeiParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))


app.get("/", (req, res) => {
  res.send("HELLO WORLD")
})
app.use('/api/auth', authRouter)

const PORT = process.env.PORT || 3000

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/api/auth`)
  })
}

module.exports = app