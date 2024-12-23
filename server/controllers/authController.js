import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const loginUser = async (req, res) => {
  const JWT_KEY = process.env.JWT_SECERT || "my_seceret_key_78887";
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Email,Password are required fields",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return req.status(401).json({
        message: "Email Id is incorrect",
      });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return req.status(401).json({
        message: "Password is incorrect",
      });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "Login successfully",
      token,
      user: user.role,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split("")[1];

  if (!token) {
    return res.status(401).json({
      message: "No token authroization access denied",
    });
  }
  try {
    const decoded = jwt.verify(token, JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expires token",
    });
  }
};
