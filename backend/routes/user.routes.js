import express from "express";
import {
  getCurrentUser,
  updateProfile,
} from "../controllers/user.controller.js";
import upload from "../middleware/multer.js";
import isAuth from "../middleware/isAuth.js";
const userRouter = express.Router();

userRouter.get("/currentuser", isAuth, getCurrentUser);
userRouter.put(
  "/update-profile",
  isAuth,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  updateProfile,
);

export default userRouter;
