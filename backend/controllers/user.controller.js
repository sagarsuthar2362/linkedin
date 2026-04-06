import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json({ success: true, user });
});
