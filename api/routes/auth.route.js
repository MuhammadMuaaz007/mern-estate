import express from "express";
import { signup ,signin, google } from "../controller/auth.controller.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);

export default router;
