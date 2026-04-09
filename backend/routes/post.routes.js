import express from "express";
import {
  createPost,
  getPosts,
  handleComment,
  handleLike,
} from "../controllers/post.controller.js";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";

const postRouter = express.Router();

postRouter.post("/create", isAuth, upload.single("image"), createPost);
postRouter.get("/", isAuth, getPosts);
postRouter.post("/like/:postId", isAuth, handleLike);
postRouter.post("/comment/:postId", isAuth, handleComment);

export default postRouter;
