import express from "express";
import {
  getUserListings,
  deleteListing,
  getUser,
} from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();


router.delete("/delete/:id", verifyToken, deleteListing);
router.get("/get/:id", getUser);
router.get("/:id", verifyToken, getUserListings);

export default router;
