import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";

export const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;

  const doesUserExist = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (doesUserExist) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    userName,
    email,
    password: hashedPassword,
  });

  const token = await generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(201)
    .json({ success: true, message: "User registered succesfully" });
});

export const login = asyncHandler(async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  const user = await User.findOne({
    $or: [{ userName: usernameOrEmail }, { email: usernameOrEmail }],
  });

  if (!user) {
    throw new ApiError(401, "invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = await generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(200)
    .json({ success: true, message: "Logged in succesfully" });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");

  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
});
