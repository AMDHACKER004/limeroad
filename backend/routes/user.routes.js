import express from "express";
import protect from "../middleware/auth.middleware.js";
import admin from "../middleware/admin.middleware.js";
import User from "../models/User.js";

const router = express.Router();

// Admin: get all users
router.get("/", protect, admin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

export default router;
