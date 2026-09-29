import express from "express";

import { requireAdmin } from "../middleware/authMiddleware.js";
import { uploadImage } from "../middleware/uploadMiddleware.js";
import { uploadProjectImage,   deleteProjectImage,} from "../controllers/uploadController.js";

const router = express.Router();

router.post(
  "/project-image",
  requireAdmin,
  uploadImage.single("image"),
  uploadProjectImage
);

router.delete(
  "/project-image",
  requireAdmin,
  deleteProjectImage
);

export default router;