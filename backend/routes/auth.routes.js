// import express from "express";
// import { registerUser, loginUser } from "../controllers/auth.controller.js";

// const router = express.Router();

// /* ---------------- AUTH ROUTES ---------------- */

// // Register new user
// router.post("/register", registerUser);

// // Login existing user
// router.post("/login", loginUser);

// export default router;


import express from "express";
import { registerUser, loginUser, adminLogin } from "../controllers/auth.controller.js";

const router = express.Router();

/* ---------------- AUTH ROUTES ---------------- */

// Register new user
router.post("/register", registerUser);

// User login
router.post("/login", loginUser);

// ✅ Admin login (NEW ROUTE ADDED)
router.post("/admin/login", adminLogin);


export default router;
