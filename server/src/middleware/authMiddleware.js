import jwt from "jsonwebtoken";

export function requireAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.admin = decoded;

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired session.",
      });
    }

    console.error("AUTH MIDDLEWARE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to authenticate request.",
    });
  }
}