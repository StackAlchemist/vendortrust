import { Router } from "express";
import { checkVendor } from "../controllers/vendorController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/check-vendor", protect, checkVendor);

export default router;
