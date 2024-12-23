import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const createUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json({
      message: "username,email,password is required",
    });
  }
  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        message: "Email already exsits",
      });
    }
    const hassedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hassedPassword,
      role,
    });
    await newUser.save();
    res.status(200).json({
      message: "user has been created",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};
