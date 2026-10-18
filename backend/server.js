// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";

// // Routes
// import authRoutes from "./routes/auth.routes.js";
// import productRoutes from "./routes/product.routes.js";
// import orderRoutes from "./routes/order.routes.js";
// import userRoutes from "./routes/user.routes.js";

// // Load env
// dotenv.config();

// // Connect DB
// connectDB();

// const app = express();

// // ---------------- CORS CONFIG (FIXED FOR BOTH FRONTENDS) ----------------
// const allowedOrigins = [
//   "http://localhost:5173", // user frontend
//   "http://localhost:5174", // admin panel
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests like Postman (no origin)
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       return callback(new Error("CORS not allowed"));
//     },
//     credentials: true,
//   })
// );

// // ---------------- MIDDLEWARES ----------------
// app.use(express.json());

// // ---------------- ROUTES ----------------
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/users", userRoutes);

// // ---------------- HEALTH CHECK ----------------
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "API is running 🚀" });
// });

// // ---------------- 404 HANDLER ----------------
// app.use((req, res) => {
//   res.status(404).json({
//     message: `Route not found - ${req.originalUrl}`,
//   });
// });

// // ---------------- GLOBAL ERROR HANDLER ----------------
// app.use((err, req, res, next) => {
//   console.error("🔥 Error:", err.message);

//   res.status(err.statusCode || 500).json({
//     message: err.message || "Something went wrong",
//   });
// });

// // ---------------- START SERVER ----------------
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });



import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import userRoutes from "./routes/user.routes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------- CORS CONFIG ----------------
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://limeroad-tau.vercel.app",
  "https://limeroad-1nz1i9w4u-amdhacker004s-projects.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header (e.g. Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error("CORS blocked origin:", origin);
      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
  })
);

// ---------------- MIDDLEWARES ----------------
app.use(express.json());

// ---------------- HEALTH CHECK ----------------
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running 🚀",
  });
});

// ---------------- API ROUTES ----------------
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

// ---------------- 404 HANDLER ----------------
app.use((req, res) => {
  res.status(404).json({
    message: `Route not found - ${req.originalUrl}`,
  });
});

// ---------------- GLOBAL ERROR HANDLER ----------------
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).json({
    message: err.message || "Something went wrong",
  });
});

// ---------------- START SERVER ----------------
async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();




