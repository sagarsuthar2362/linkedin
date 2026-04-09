import Post from "../models/post.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import ApiError from "../utils/ApiError.js";

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

export const handleLike = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.likes.includes(req.userId)) {
    post.likes = post.likes.filter(
      (id) => id.toString() !== req.userId.toString(),
    );
  } else {
    post.likes.push(req.userId);
  }

  await post.save();

  return res.status(200).json({
    success: true,
    message: "Post liked/unliked successfully",
  });
});

export const handleComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  if (!content || content.trim() === "") {
    throw new ApiError(400, "comment cannot be empty");
  }

  const post = await Post.findByIdAndUpdate(postId, {
    $push: {
      comments: {
        content,
        user: req.userId,
      },
    },
  });

  if (!post) {
    throw new ApiError(404, "post not found");
  }

  console.log(post)
  return res
    .status(200)
    .json({ success: true, message: "Comment added succesfully" });

  console.log(post);
});
