import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { useState } from "react";
import { cancelOrderApi } from "../services/endpoints";

const CancelOrder = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { orders, fetchOrders } = useOrders();

  const order =
    location.state?.order ||
    orders.find((o) => String(o._id) === String(orderId));

  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  if (!order) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h3>Order not found</h3>
          <button onClick={() => navigate("/orders")}>Go Back</button>
        </div>
      </>
    );
  }

  const handleCancel = async () => {
    if (!reason) return alert("Select a reason");

    try {
      setLoading(true);

      // IMPORTANT: Only request, not final cancel
      await cancelOrderApi(order._id, reason);

      alert("Cancellation request submitted");

      await fetchOrders?.();

      navigate("/orders");
    } catch (error) {
      console.error(error);
      alert("Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.card}>
          <h2>Cancel Order</h2>

          <p><b>Order ID:</b> {order._id}</p>
          <p><b>Total:</b> ₹{order.total}</p>

          <label style={styles.label}>Reason</label>

          <select
            style={styles.select}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="">Select reason</option>
            <option value="Changed my mind">Changed my mind</option>
            <option value="Ordered by mistake">Ordered by mistake</option>
            <option value="Found cheaper elsewhere">Found cheaper elsewhere</option>
            <option value="Delivery delay">Delivery delay</option>
          </select>

          <button
            style={styles.btn}
            onClick={handleCancel}
            disabled={!reason || loading}
          >
            {loading ? "Submitting..." : "Confirm Cancellation"}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CancelOrder;

/* styles same */
const styles = {
  page: {
    background: "#f5f5f5",
    minHeight: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "420px",
    border: "1px solid #ddd"
  },
  label: {
    display: "block",
    marginTop: "20px",
    marginBottom: "8px",
    fontWeight: "600"
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  btn: {
    marginTop: "20px",
    width: "100%",
    padding: "12px",
    background: "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};


