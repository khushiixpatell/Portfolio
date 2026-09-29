import express from "express";

import { requireAdmin } from "../middleware/authMiddleware.js";

import {
  getAdminSkills,
  createSkillGroup,
  updateSkillGroup,
  deleteSkillGroup,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController.js";

const router = express.Router();

router.use(requireAdmin);

router.get("/", getAdminSkills);

router.post("/groups", createSkillGroup);
router.patch("/groups/:id", updateSkillGroup);
router.delete("/groups/:id", deleteSkillGroup);

router.post("/items", createSkill);
router.patch("/items/:id", updateSkill);
router.delete("/items/:id", deleteSkill);

export default router;