import express from "express";

import { requireAdmin } from "../middleware/authMiddleware.js";

import {
  getAdminExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController.js";

const router = express.Router();

router.use(requireAdmin);

router.get("/", getAdminExperiences);
router.post("/", createExperience);
router.patch("/:id", updateExperience);
router.delete("/:id", deleteExperience);

export default router;