import API from "./api";

/* ---------------- AUTH ---------------- */

export const loginUser = (data) => API.post("/auth/login", data);

export const registerUser = (data) => API.post("/auth/register", data);


/* ---------------- PRODUCTS ---------------- */

export const getAllProducts = () => API.get("/products");

export const getSingleProduct = (id) => API.get(`/products/${id}`);


/* ---------------- ORDERS ---------------- */

// Create new order
export const createOrder = (data) => API.post("/orders", data);

// Get logged-in user's orders
export const getMyOrders = () => API.get("/orders/my-orders");

// Cancel order
// export const cancelOrderApi = (orderId, reason) =>
//   API.put(`/orders/${orderId}/cancel`, { reason });

export const cancelOrderApi = (orderId, reason) =>
  API.put(`/orders/${orderId}/cancel-request`, { reason });
