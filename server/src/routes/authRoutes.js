import express from "express";

import {
  login,
  getCurrentAdmin,
} from "../controllers/authController.js";

import { requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);

router.get(
  "/me",
  requireAdmin,
  getCurrentAdmin
);

export default router;