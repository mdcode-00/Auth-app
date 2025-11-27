import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();



export const genrateToken = (res, userId) => {

  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

  const refreshToken = jwt.sign(
    { userId },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  )

  const accessToken = jwt.sign(
    { userId },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "10s" }
  )



  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true in production
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  })




  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true in production
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 1 * 1000
  })


  return { accessToken, refreshToken }

}
