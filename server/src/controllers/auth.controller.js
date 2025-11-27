import { genrateToken } from "../config/createToken.js";
import Auth from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * SignUp Controller
 */
export const SingInController = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(409).json({ message: "filled all detail" });
    }

    const exists = await Auth.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const user = new Auth({
      userName,
      email,
      password: hashPassword,
    });

    genrateToken(res, user._id);
    await user.save();

    res.status(200).json({
      message: "user created",
      user: {
        userName: user.userName,
        email: user.email,
        id: user._id,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Error in singin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Login Controller
 */
export const LogInController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(409).json({ message: "filled all detail" });
    }

    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(409).json({ message: "user not found" });
    }

    const decode = bcrypt.compareSync(password, user.password);
    if (!decode) {
      return res.status(401).json({ message: "invalid condntionals" });
    }

    genrateToken(res, user._id);
    await user.save();

    res.status(201).json({
      message: "LogIn successfully",
      user: {
        userName: user.userName,
        email: user.email,
        id: user._id,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Error in LogIn:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Logout Controller
 */
export const LogOutController = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    res.clearCookie("access_token");

    res.status(200).json({ message: "Logged Out" });
  } catch (error) {
    console.error("Error in LogOut:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Refresh Token Controller
 */
export const RefreshController = async (req, res) => {
  const token = req.cookies.refresh_token;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const decode = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    // genrateToken(res, decode.userId); // uncomment if you want to issue new tokens

    res.status(200).json({
      message: "token genrated",
      userId: decode.userId,
    });
  } catch (error) {
    console.error("Error in token refreshing:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
