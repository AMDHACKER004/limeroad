import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { useOrders } from "../context/OrderContext.jsx";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { orders = [], fetchOrders } = useOrders();

  const latestOrder = orders.length > 0 ? orders[0] : null;

  // Fetch orders if empty
  useEffect(() => {
    if (orders.length === 0) {
      fetchOrders?.();
    }
  }, [orders, fetchOrders]);

  // Redirect safety
  useEffect(() => {
    if (!latestOrder) {
      const timer = setTimeout(() => navigate("/"), 800);
      return () => clearTimeout(timer);
    }
  }, [latestOrder, navigate]);

  if (!latestOrder) return null;

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.icon}>🎉</div>

          <h2 style={styles.heading}>Order Placed Successfully!</h2>

          <p style={styles.text}>
            Thank you for shopping with LimeRoad.
          </p>

          <p style={styles.orderId}>
            <b>Order ID:</b> {latestOrder._id}
          </p>

          <div style={styles.actions}>
            <button
              style={styles.primary}
              onClick={() => navigate("/orders")}
            >
              VIEW MY ORDERS
            </button>

            <button
              style={styles.secondary}
              onClick={() => navigate("/")}
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrderSuccess;

// ✅ REQUIRED styles (this was missing in your file)
const styles = {
  page: {
    background: "#f5f5f5",
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    border: "1px solid #e5e5e5",
    textAlign: "center",
    maxWidth: "420px",
    width: "100%",
  },
  icon: {
    fontSize: "48px",
    marginBottom: "12px",
  },
  heading: {
    fontSize: "22px",
    marginBottom: "10px",
  },
  text: {
    fontSize: "14px",
    color: "#666",
  },
  orderId: {
    marginTop: "14px",
    fontSize: "14px",
  },
  actions: {
    marginTop: "26px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  primary: {
    padding: "12px",
    background: "#ff0055",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
  },
  secondary: {
    padding: "12px",
    background: "#ffffff",
    color: "#ff0055",
    border: "1px solid #ff0055",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
  },
};
