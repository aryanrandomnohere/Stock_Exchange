import express from "express";
import { google, signin, signup, signout } from "../controller/auth_controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.post("/signout", signout);

export default router;
