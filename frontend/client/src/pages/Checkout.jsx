import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice } = useCart();
  const { user } = useAuth();

  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    pincode: ""
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const isValid =
    address.name &&
    address.mobile &&
    address.address &&
    address.city &&
    address.pincode;

  const handleContinue = () => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    localStorage.setItem("checkout_address", JSON.stringify(address));
    navigate("/payment");
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.container}>
          {/* LEFT */}
          <div style={styles.left}>
            <h3>Delivery Address</h3>

            <input name="name" placeholder="Full Name" value={address.name} onChange={handleChange} style={styles.input} />
            <input name="mobile" placeholder="Mobile Number" value={address.mobile} onChange={handleChange} style={styles.input} />
            <input name="address" placeholder="Address" value={address.address} onChange={handleChange} style={styles.input} />
            <input name="city" placeholder="City" value={address.city} onChange={handleChange} style={styles.input} />
            <input name="pincode" placeholder="Pincode" value={address.pincode} onChange={handleChange} style={styles.input} />

            <button
              disabled={!isValid}
              onClick={handleContinue}
              style={{ ...styles.btn, opacity: isValid ? 1 : 0.6 }}
            >
              CONTINUE TO PAYMENT
            </button>
          </div>

          {/* RIGHT */}
          <div style={styles.right}>
            <h4>Order Summary</h4>

            {cartItems.map((item) => (
              <div key={item._id || item.id} style={styles.summaryRow}>
                <span>{item.title} × {item.qty}</span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}

            <hr />

            <div style={styles.totalRow}>
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Checkout;

const styles = {
  page: {
    background: "#f5f5f5",
    minHeight: "80vh"
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "30px",
    display: "flex",
    gap: "30px"
  },
  left: {
    flex: 2,
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #e5e5e5"
  },
  right: {
    flex: 1,
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #e5e5e5"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "4px"
  },
  btn: {
    width: "100%",
    padding: "12px",
    background: "#ff0055",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer"
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "6px"
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "600"
  }
};
