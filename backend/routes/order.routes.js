// import express from "express";
// import {
//   createOrder,
//   getMyOrders,
//   getAllOrders,
//   updateOrderStatus,
//   requestCancelOrder   // 👈 NEW
// } from "../controllers/order.controller.js";

// import protect from "../middleware/auth.middleware.js";
// import admin from "../middleware/admin.middleware.js";

// const router = express.Router();

// // ---------------- USER ROUTES ----------------

// // Create order
// router.post("/", protect, createOrder);

// // Get logged-in user's orders
// router.get("/my-orders", protect, getMyOrders);

// // ✅ NEW: User cancel request (ecommerce behavior)
// router.put("/:id/cancel-request", protect, requestCancelOrder);


// // ---------------- ADMIN ROUTES ----------------

// // Get all orders
// router.get("/", protect, admin, getAllOrders);

// // Update order status (admin only)
// router.put("/:id", protect, admin, updateOrderStatus);

// export default router;


import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  requestCancelOrder,
  getOrdersByUserForAdmin // 👈 NEW import
} from "../controllers/order.controller.js";

import protect from "../middleware/auth.middleware.js";
import admin from "../middleware/admin.middleware.js";

const router = express.Router();

// ---------------- USER ROUTES ----------------

// Create order
router.post("/", protect, createOrder);

// Get logged-in user's orders
router.get("/my-orders", protect, getMyOrders);

// User cancel request
router.put("/:id/cancel-request", protect, requestCancelOrder);


// ---------------- ADMIN ROUTES ----------------

// Get all orders
router.get("/", protect, admin, getAllOrders);

// Update order status (admin only)
router.put("/:id", protect, admin, updateOrderStatus);

// 👇 NEW ROUTE: Get any user's orders (ADMIN)
router.get(
  "/admin/user/:userId/orders",
  protect,
  admin,
  getOrdersByUserForAdmin
);

export default router;
