import express from "express";

import { requireAdmin } from "../middleware/authMiddleware.js";

import {
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/adminProjectController.js";

const router = express.Router();

// Everything below this line requires authentication.
router.use(requireAdmin);

router.get("/", getAdminProjects);
router.post("/", createProject);
router.patch("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;