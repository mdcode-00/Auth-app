import serverless from 'serverless-http';
import app from '../src/index.js';

const handler = async (req, res) => {
  // Handle CORS for Vercel serverless
  res.setHeader("Access-Control-Allow-Origin", "https://auth-app-eight-gold.vercel.app");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

  const expressHandler = serverless(app);
  return expressHandler(req, res);
};

export default handler;
