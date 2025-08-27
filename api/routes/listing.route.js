import express from "express";
import multer from "multer";
import {
  createListing,
  uploads,
  getListing,
  updateListing,
} from "../controller/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "api/uploads/listingImages");
  },
  filename: (req, file, cb) => {
    const suffix = Date.now();
    cb(null, suffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });
router.post("/create", verifyToken, createListing);
router.post("/upload", upload.array("images", 6), uploads);
router.get("/get/:id", getListing);
router.put("/update/:id", verifyToken, updateListing);

export default router;
