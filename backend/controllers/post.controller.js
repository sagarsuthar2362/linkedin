import Post from "../models/post.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../config/cloudinary.js";

export const createPost = asyncHandler(async (req, res) => {
  const { description } = req.body;
  let newPost;
  if (req.file) {
    const image = req.file.path;
    const imageUrl = await uploadOnCloudinary(image);

    newPost = await Post.create({
      author: req.userId,
      description,
      image: imageUrl,
    });
  } else {
    newPost = await Post.create({
      author: req.userId,
      description,
    });
  }

  res.status(201).json({
    success: true,
    message: "Post created successfully",
    post: newPost,
  });
});

export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .populate("author", "-password -email -__v")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    posts,
  });
});
