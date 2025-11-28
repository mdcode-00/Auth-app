import serverless from 'serverless-http'
import app from '../src/index.js'

const expressHandler = serverless(app)

const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173'
].filter(Boolean)

export default async function handler(req, res) {
  const origin = req.headers.origin
  if (origin && (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app'))) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,Accept,X-Requested-With')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  return expressHandler(req, res)
}