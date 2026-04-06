export const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    const statusCode = error.statusCode;
    return res
      .status(statusCode)
      .json({ message: error.message || "Internal server error" });
  }
};
