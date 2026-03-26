import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import userRoutes from "./routes/user.routes.js";

// Load env
dotenv.config();

// Connect DB
connectDB();

const app = express();

// ---------------- CORS CONFIG (FIXED FOR BOTH FRONTENDS) ----------------
const allowedOrigins = [
  "http://localhost:5173", // user frontend
  "http://localhost:5174", // admin panel
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests like Postman (no origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
  })
);

// ---------------- MIDDLEWARES ----------------
app.use(express.json());

// ---------------- ROUTES ----------------
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

// ---------------- HEALTH CHECK ----------------
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running 🚀" });
});

// ---------------- 404 HANDLER ----------------
app.use((req, res) => {
  res.status(404).json({
    message: `Route not found - ${req.originalUrl}`,
  });
});

// ---------------- GLOBAL ERROR HANDLER ----------------
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);

  res.status(err.statusCode || 500).json({
    message: err.message || "Something went wrong",
  });
});

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
