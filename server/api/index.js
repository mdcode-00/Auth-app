import app from '../src/index.js';

export default function handler(req, res) {
  // CORS for Vercel
  res.setHeader("Access-Control-Allow-Origin", "https://auth-app-eight-gold.vercel.app");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return app(req, res);
}
