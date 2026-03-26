import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { useCart } from "../context/CartContext.jsx";
import { useOrders } from "../context/OrderContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { user } = useAuth();

  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false); // ✅ NEW STATE

  // ✅ Fix: sirf tab cart redirect jab order place nahi hua ho
  useEffect(() => {
    if (!orderPlaced && cartItems && cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate, orderPlaced]);

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (!method) {
      alert("Please select a payment method");
      return;
    }

    try {
      setLoading(true);

      await placeOrder(cartItems, totalPrice, {
        paymentMethod: method,
      });

      setOrderPlaced(true);   // ✅ IMPORTANT LINE
      clearCart();
      navigate("/order-success");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Order failed, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Select Payment Method</h2>

          <label style={styles.option}>
            <input
              type="radio"
              name="pay"
              value="COD"
              checked={method === "COD"}
              onChange={(e) => setMethod(e.target.value)}
            />{" "}
            Cash on Delivery
          </label>

          <label style={styles.option}>
            <input
              type="radio"
              name="pay"
              value="UPI"
              checked={method === "UPI"}
              onChange={(e) => setMethod(e.target.value)}
            />{" "}
            UPI / Google Pay / PhonePe
          </label>

          <label style={styles.option}>
            <input
              type="radio"
              name="pay"
              value="CARD"
              checked={method === "CARD"}
              onChange={(e) => setMethod(e.target.value)}
            />{" "}
            Credit / Debit Card
          </label>

          <button
            style={{
              ...styles.btn,
              opacity: loading ? 0.6 : 1,
            }}
            disabled={loading}
            onClick={handlePlaceOrder}
          >
            {loading ? "Placing Order..." : "PLACE ORDER"}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Payment;


const styles = {
  page: {
    background: "#f5f5f5",
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "400px",
    background: "#fff",
    padding: "30px",
    borderRadius: "8px",
    border: "1px solid #e5e5e5",
  },
  heading: {
    marginBottom: "16px",
  },
  option: {
    display: "block",
    marginBottom: "12px",
    fontSize: "14px",
    cursor: "pointer",
  },
  btn: {
    marginTop: "20px",
    width: "100%",
    padding: "12px",
    background: "#ff0055",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
  },
};
