import { Router } from "express";
import { createFlag } from "../controllers/FlagController.js";
import { protect } from "../middlewares/authMiddleware.js";


const router = Router();

router.post("/create-flag", protect, createFlag);

export default router;