import { Router } from "express";
import { signupUser, loginUser } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { getSearchHistory } from "../controllers/userController.js";

const router = Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/history", protect, getSearchHistory);   

export default router;
