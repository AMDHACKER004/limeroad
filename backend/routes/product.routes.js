// import express from "express";
// import {
//   getProducts,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct
// } from "../controllers/product.controller.js";

// import protect from "../middleware/auth.middleware.js";
// import admin from "../middleware/admin.middleware.js";

// const router = express.Router();

// // Public routes
// router.get("/", getProducts);
// router.get("/:id", getProductById);

// // Admin routes
// router.post("/", protect, admin, createProduct);
// router.put("/:id", protect, admin, updateProduct);
// router.delete("/:id", protect, admin, deleteProduct);

// export default router;

import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import protect from "../middleware/auth.middleware.js";
import admin from "../middleware/admin.middleware.js";

const router = express.Router();

/* ---------------- PUBLIC ROUTES ---------------- */

// Get all products
router.get("/", getProducts);

// Get single product by id
router.get("/:id", getProductById);

/* ---------------- ADMIN ROUTES ---------------- */

// Create product
router.post("/", protect, admin, createProduct);

// Update product
router.put("/:id", protect, admin, updateProduct);

// Delete product (soft delete)
router.delete("/:id", protect, admin, deleteProduct);

export default router;
