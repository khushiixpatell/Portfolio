import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import projectRoutes from "./routes/projectRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminProjectRoutes from "./routes/adminProjectRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import adminExperienceRoutes from "./routes/adminExperienceRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import adminSkillRoutes from "./routes/adminSkillRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL =
  process.env.CLIENT_URL || "http://localhost:5173";

const allowedOrigins = [
  "http://localhost:5173",
  "https://khushi-portfolio-psi.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],

  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Khushi Portfolio API is running",
  });
});

app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin/projects", adminProjectRoutes);
app.use("/api/admin/uploads", uploadRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/admin/experiences", adminExperienceRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/admin/skills", adminSkillRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

app.use((err, req, res, next) => {
  console.error("UNHANDLED ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error."
        : err.message || "Internal server error.",
  });
});

app.listen(PORT, () => {
console.log(`Portfolio API running on port ${PORT}`);
});