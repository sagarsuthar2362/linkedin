import express from "express";
import isAuth from "../middleware/isAuth";
import {
  acceptConnection,
  rejectConnection,
  sendConnection,
} from "../controllers/connection.controller";
const connectionRouter = express.Router();

connectionRouter.get("/send/:receiverId", isAuth, sendConnection);
connectionRouter.get("/accept/:connectionId", isAuth, acceptConnection);
connectionRouter.get("/reject/:connectionId", isAuth, rejectConnection);

export default connectionRouter;
