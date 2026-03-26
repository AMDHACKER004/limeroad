// import Order from "../models/Order.js";

// /* ---------------- CREATE ORDER ---------------- */
// /* POST /api/orders */
// export const createOrder = async (req, res) => {
//   try {
//     const { items, total, address, paymentMethod } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({ message: "No order items" });
//     }

//     const order = await Order.create({
//       user: req.user._id,
//       items,
//       total,
//       address,
//       paymentMethod,
//       status: "Placed",
//       cancelRequested: false,   // 👈 ensure default
//     });

//     res.status(201).json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* ---------------- GET MY ORDERS ---------------- */
// /* GET /api/orders/my-orders */
// export const getMyOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.user._id }).sort({
//       createdAt: -1,
//     });

//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* ---------------- USER: REQUEST CANCEL ---------------- */
// /* PUT /api/orders/:id/cancel-request */
// export const requestCancelOrder = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     // Ensure user owns the order
//     if (order.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: "Not authorized" });
//     }

//     // Already requested?
//     if (order.cancelRequested) {
//       return res.status(400).json({ message: "Cancel already requested" });
//     }

//     order.cancelRequested = true;
//     order.cancelReason = req.body.reason || "";

//     await order.save();

//     res.json({ message: "Cancellation request submitted" });
//   } catch (error) {
//     console.error("Cancel request error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /* ---------------- ADMIN: GET ALL ORDERS ---------------- */
// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate("user", "name email");
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* ---------------- ADMIN: UPDATE ORDER STATUS ---------------- */
// export const updateOrderStatus = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     order.status = req.body.status || order.status;

//     // If admin cancels finally, also clear cancelRequested
//     if (req.body.status === "Cancelled") {
//       order.cancelRequested = false;
//     }

//     const updatedOrder = await order.save();
//     res.json(updatedOrder);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

import Order from "../models/Order.js";

/* ---------------- CREATE ORDER ---------------- */
/* POST /api/orders */
export const createOrder = async (req, res) => {
  try {
    const { items, total, address, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      total,
      address,
      paymentMethod,
      status: "Placed",
      cancelRequested: false,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- GET MY ORDERS ---------------- */
/* GET /api/orders/my-orders */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- USER: REQUEST CANCEL ---------------- */
/* PUT /api/orders/:id/cancel-request */
export const requestCancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (order.cancelRequested) {
      return res.status(400).json({ message: "Cancel already requested" });
    }

    order.cancelRequested = true;
    order.cancelReason = req.body.reason || "";

    await order.save();

    res.json({ message: "Cancellation request submitted" });
  } catch (error) {
    console.error("Cancel request error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------- ADMIN: GET ALL ORDERS ---------------- */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- ADMIN: UPDATE ORDER STATUS ---------------- */
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = req.body.status || order.status;

    if (req.body.status === "Cancelled") {
      order.cancelRequested = false;
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ---------------- ADMIN: GET ORDERS OF SPECIFIC USER ---------------- */
/* GET /api/orders/admin/user/:userId/orders */
export const getOrdersByUserForAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("user", "name email");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Admin fetch user orders error:", error);
    res.status(500).json({ message: "Failed to fetch user orders" });
  }
};

