import express from "express";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
const PORT = process.env.PORT || 3000;

dotenv.config();
const app = express();
await connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
