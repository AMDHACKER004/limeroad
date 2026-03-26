import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { useEffect, useState } from "react";

// Local images
import m1 from "../assets/products/m1.png";
import m2 from "../assets/products/m2.png";
import m3 from "../assets/products/m3.png";
import w1 from "../assets/products/w1.png";
import w2 from "../assets/products/w2.png";
import w3 from "../assets/products/w3.png";
import k1 from "../assets/products/k1.png";


const imageMap = {
  "m1.png": m1,
  "m2.png": m2,
  "m3.png": m3,
  "w1.png": w1,
  "w2.png": w2,
  "w3.png": w3,
  "k1.png": k1,
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    if (products?.length) {
      const found = products.find((p) => p._id === id);
      setProduct(found);
    }
  }, [products, id]);

  // ---------- Helpers ----------
  const capitalizeTitle = (text) =>
    text
      ?.split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ") || "";

  const capitalizeFirst = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN").format(price);

  const generateStars = (rating = 4) => "⭐".repeat(rating);

  if (loading) {
    return (
      <div style={{ padding: 40 }}>
        <div style={{ height: 300, background: "#eee", borderRadius: 10 }} />
        <div style={{ height: 20, background: "#eee", marginTop: 20 }} />
        <div
          style={{
            height: 20,
            background: "#eee",
            width: "60%",
            marginTop: 10,
          }}
        />
      </div>
    );
  }

  if (!product) return <h2 style={{ padding: 40 }}>Product not found</h2>;

  const finalImage =
    imageMap[product.image] || product.image || "https://picsum.photos/400";

  const handleAddToCart = () => {
    if (!user) return alert("Login first");

    if (product.sizes?.length && !selectedSize)
      return alert("Select size");

    if (product.colors?.length && !selectedColor)
      return alert("Select color");

    addToCart({ ...product, selectedSize, selectedColor });
    navigate("/cart");
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.container}>
          {/* Image */}
          <div>
            <img
              src={finalImage}
              alt={product.title}
              style={styles.image}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
          </div>

          {/* Info */}
          <div style={styles.info}>
            <p style={styles.brand}>{capitalizeFirst(product.brand)}</p>
            <h2>{capitalizeTitle(product.title)}</h2>

            <h3 style={{ fontSize: 22 }}>
              ₹{formatPrice(product.price)}
            </h3>
            <p style={{ color: "#f39c12" }}>
              {generateStars(product.rating || 4)}
            </p>

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <p style={{ fontWeight: 600 }}>Select Size</p>
                <div style={styles.row}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        ...styles.optionBtn,
                        border:
                          selectedSize === size
                            ? "2px solid #ff0055"
                            : "1.5px solid #ccc",
                        background:
                          selectedSize === size ? "#fff0f6" : "#fff",
                        color:
                          selectedSize === size ? "#ff0055" : "#111",
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <p style={{ fontWeight: 600 }}>Select Color</p>
                <div style={styles.row}>
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        ...styles.optionBtn,
                        border:
                          selectedColor === color
                            ? "2px solid #ff0055"
                            : "1.5px solid #ccc",
                        background:
                          selectedColor === color ? "#fff0f6" : "#fff",
                        color:
                          selectedColor === color ? "#ff0055" : "#111",
                      }}
                    >
                      {capitalizeFirst(color)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button style={styles.cartBtn} onClick={handleAddToCart}>
              ADD TO CART
            </button>

            <div style={{ marginTop: 30 }}>
              <h4>Description</h4>
              <p style={{ color: "#555" }}>
                {capitalizeFirst(product.description)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

const styles = {
  page: { background: "#f5f5f5", minHeight: "100vh" },

  container: {
    maxWidth: "1100px",
    margin: "auto",
    padding: "20px",
    display: "flex",
    gap: "40px",
    flexWrap: "wrap",
  },

  image: {
    width: "100%",
    maxWidth: "420px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    transition: "transform 0.3s ease",
  },

  info: {
    background: "#fff",
    padding: 30,
    borderRadius: 10,
    flex: 1,
  },

  brand: {
    color: "#777",
    fontSize: 13,
  },

  row: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },

  optionBtn: {
    padding: "10px 18px",
    background: "#fff",
    color: "#111",
    cursor: "pointer",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    minWidth: "55px",
    border: "1.5px solid #ccc",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    transition: "all 0.2s ease",
  },

  cartBtn: {
    marginTop: 30,
    padding: "14px",
    width: "100%",
    background: "#ff0055",
    color: "#fff",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: 8,
    fontSize: "16px",
  },
};

export default ProductDetails;
