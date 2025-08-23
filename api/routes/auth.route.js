import express from "express";
import multer from "multer";
import path from "path";
import {
  signup,
  signin,
  google,
  update,
  signout,
  deleteUser,
} from "../controller/auth.controller.js";
import { fileURLToPath } from "url";
const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "api/uploads/profileImages");
  },
  filename: (req, file, cb) => {
    const suffix = Date.now();
    cb(null, suffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.put("/update/:id", upload.single("avatar"), update);
router.post("/signout", signout);
router.delete("/delete/:id", deleteUser);


export default router;
