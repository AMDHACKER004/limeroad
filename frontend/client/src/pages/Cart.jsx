import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

// Local images
import m1 from "../assets/products/m1.png";
import m3 from "../assets/products/m3.png";
import m2 from "../assets/products/m2.png";
import w1 from "../assets/products/w1.png";
import w2 from "../assets/products/w2.png";
import k1 from "../assets/products/k1.png";
import w3 from "../assets/products/w3.png";

const imageMap = {
  "m1.png": m1,
  "m2.png": m2,
  "m3.png": m3,
  "w1.png": w1,
  "w2.png": w2,
  "w3.png": w3,
  "k1.png": k1,
};

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, increaseQty, decreaseQty, removeFromCart, totalPrice } =
    useCart();
  const { user } = useAuth();

  const handleCheckout = () => {
    if (!user) {
      alert("Please login to continue");
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.container}>
          <h2 style={styles.heading}>My Cart</h2>

          {cartItems.length === 0 ? (
            <p style={styles.empty}>Your cart is empty</p>
          ) : (
            <>
              {cartItems.map((item) => {
                const finalImage =
                  imageMap[item.image] || item.image || "https://picsum.photos/200";

                return (
                  <div key={item._id || item.id} style={styles.item}>
                    <img
                      src={finalImage}
                      alt={item.title}
                      style={styles.image}
                    />

                    <div style={styles.info}>
                      <h4 style={styles.title}>{item.title}</h4>
                      <p style={styles.price}>₹{item.price}</p>

                      {/* ✅ NEW: SIZE + COLOR */}
                      {item.selectedSize && (
                        <p style={styles.variant}>Size: {item.selectedSize}</p>
                      )}
                      {item.selectedColor && (
                        <p style={styles.variant}>Color: {item.selectedColor}</p>
                      )}

                      <div style={styles.qty}>
                        <button
                          style={styles.qtyBtn}
                          onClick={() => decreaseQty(item._id || item.id)}
                        >
                          −
                        </button>

                        <span>{item.qty}</span>

                        <button
                          style={styles.qtyBtn}
                          onClick={() => increaseQty(item._id || item.id)}
                        >
                          +
                        </button>
                      </div>

                      <button
                        style={styles.remove}
                        onClick={() => removeFromCart(item._id || item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}

              <div style={styles.summary}>
                <h3>Total: ₹{totalPrice}</h3>

                <button style={styles.checkout} onClick={handleCheckout}>
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

const styles = {
  page: {
    background: "#f5f5f5",
    minHeight: "70vh",
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "30px 16px",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "22px",
  },
  empty: {
    color: "#555",
  },
  item: {
    display: "flex",
    gap: "20px",
    marginBottom: "16px",
    background: "#ffffff",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid #e5e5e5",
  },
  image: {
    width: "120px",
    height: "160px",
    objectFit: "cover",
    borderRadius: "6px",
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: "16px",
    marginBottom: "6px",
  },
  price: {
    fontWeight: "600",
    marginBottom: "4px",
  },

  // ✅ New style for size/color
  variant: {
    fontSize: "13px",
    color: "#555",
    marginBottom: "4px",
  },

  qty: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "8px",
    marginTop: "6px",
  },
  qtyBtn: {
    width: "28px",
    height: "28px",
    border: "1px solid #ccc",
    background: "black",
    color: "#fff",
    cursor: "pointer",
  },
  remove: {
    background: "none",
    border: "none",
    color: "#ff0055",
    cursor: "pointer",
  },
  summary: {
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkout: {
    padding: "12px 32px",
    background: "#ff0055",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Cart;
