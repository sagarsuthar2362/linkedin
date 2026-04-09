import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import uploadOnCloudinary from "../config/cloudinary.js";

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json({ success: true, user });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    userName,
    headline,
    location,
    skills,
    experience,
    education,
  } = req.body;

  const user = await User.findById(req.userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  let profileImagePath = user.profileImage;
  let coverImagePath = user.coverImage;

  if (req.files?.profileImage?.[0]) {
    let uploaded = await uploadOnCloudinary(req.files.profileImage[0].path);
    profileImagePath = uploaded || profileImagePath;
  }

  if (req.files?.coverImage?.[0]) {
    let uploaded = await uploadOnCloudinary(req.files.coverImage[0].path);
    coverImagePath = uploaded || coverImagePath;
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.userId,
    {
      $set: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(userName && { userName }),
        ...(headline && { headline }),
        ...(location && { location }),
        ...(skills && { skills: JSON.parse(skills) }),
        profileImage: profileImagePath,
        coverImage: coverImagePath,
        ...(experience && { experience: JSON.parse(experience) }),
        ...(education && { education: JSON.parse(education) }),
      },
    },
    { new: true },
  );

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: updatedUser,
  });
});
