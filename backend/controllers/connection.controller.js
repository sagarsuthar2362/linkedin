import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import Connection from "../models/connection.model";
import User from "../models/user.model";

export const sendConnection = asyncHandler(async (req, res) => {
  const { receiverId } = req.params;
  const senderId = req.userId;

  if (receiverId == senderId) {
    throw new ApiError(404, "invalid request");
  }

  const user = await User.findById(senderId);

  if (user.connections.includes(receiverId)) {
    throw new ApiError(400, "you are already connected");
  }

  let existingConnection = await Connection.findOne({
    sender: senderId,
    receiver: receiverId,
    status: "pending",
  });

  if (existingConnection) {
    throw new ApiError(400, "request already exists");
  }

  let newRequest = await Connection.create({
    sender: req.userId,
    receiver: req.userId,
  });

  return res
    .status(200)
    .json({ success: true, message: "Request send succesfully" });
});

export const acceptConnection = asyncHandler(async (req, res) => {
  const { connectionId } = req.params;

  const requestedConnection = await Connection.findById(connectionId);

  if (!requestedConnection) {
    throw new ApiError(404, "no connection exists");
  }

  if (requestedConnection.status !== "pending") {
    throw new ApiError(404, "request under process");
  }

  requestedConnection.status = "accepted";
  await Connection.save();

  const senderId = requestedConnection.sender;
  const receiverId = requestedConnection.receiver;

  await User.findByIdAndUpdate(senderId, {
    $addToSet: { connection: receiverId },
  });
  await User.findByIdAndUpdate(receiverId, {
    $addToSet: { connection: senderId },
  });

  return res
    .status(200)
    .json({ success: true, message: "connection accepted" });
});

export const rejectConnection = asyncHandler(async (req, res) => {
  const { connectionId } = req.params;

  const existingConnection = await Connection.findById(connectionId);

  if (!existingConnection) {
    throw new ApiError(404, "connection request does not exist");
  }

  existingConnection.status = "rejected";
  await Connection.save();

  return res
    .status(200)
    .json({ success: true, message: "rejected succesfully" });
});
