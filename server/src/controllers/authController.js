import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "../lib/prisma.js";

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    const token = jwt.sign(
      {
        adminId: admin.id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Unable to log in.",
    });
  }
}

export async function getCurrentAdmin(req, res) {
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        id: req.admin.adminId,
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin account not found.",
      });
    }

    res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    console.error("GET CURRENT ADMIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Unable to verify admin.",
    });
  }
}