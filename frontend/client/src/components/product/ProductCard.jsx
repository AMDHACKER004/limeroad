import { useNavigate } from "react-router-dom";
import ProductBadge from "./ProductBadge";
import ProductActions from "./ProductActions";

// ✅ Local images import
import m1 from "../../assets/products/m1.png";
import m2 from "../../assets/products/m2.png";
import m3 from "../../assets/products/m3.png";
import w1 from "../../assets/products/w1.png";
import w2 from "../../assets/products/w2.png";
import k1 from "../../assets/products/k1.png";
import w3 from "../../assets/products/w3.png";

// ✅ Image map (product.image value ke basis pe)
const imageMap = {
  "m1.png": m1,
  "m2.png": m2,
  "m3.png": m3,
  "w1.png": w1,
  "w2.png": w2,
  "w3.png": w3,
  "k1.png": k1,
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (!product?._id) {
      console.error("❌ Product ID missing:", product);
      return;
    }
    navigate(`/product/${product._id}`);
  };

  const handleWishlist = (item) => {
    console.log("❤️ Added to wishlist:", item.title);
    alert(`${item.title} added to wishlist`);
  };

  const handleView = (item) => {
    navigate(`/product/${item._id}`);
  };

  // ✅ Final image decide (offline > online > fallback)
  const mainImage =
    imageMap[product.image] ||
    product.image ||
    m1;

  return (
    <div style={styles.card} onClick={handleCardClick}>
      {/* Brand */}
      <div style={styles.brandRow}>
        <div style={styles.avatar} />
        <span>By {product.brand || "Brand"}</span>
      </div>

      {/* Images */}
      <div style={styles.imageWrapper}>
        <div style={styles.mainImageBox}>
          <img
            src={mainImage}
            alt={product.title}
            style={styles.image}
          />

          <ProductBadge count={product.moreImages || 0} />

          <div onClick={(e) => e.stopPropagation()}>
            <ProductActions
              product={product}
              onWishlist={handleWishlist}
              onView={handleView}
            />
          </div>
        </div>

        {/* Thumbnails */}
        {product.thumbnails?.length > 0 && (
          <div style={styles.thumbColumn}>
            {product.thumbnails.slice(0, 3).map((img, index) => (
              <img
                key={index}
                src={imageMap[img] || img}
                alt="thumb"
                style={styles.thumb}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={styles.info}>
        <p style={styles.exclusive}>LIMEROAD EXCLUSIVE</p>
        <p style={styles.title}>{product.title}</p>
        <p style={styles.discount}>{product.discount}% OFF</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: "#ffffff",
    borderRadius: "8px",
    border: "1px solid #e5e5e5",
    overflow: "hidden",
    cursor: "pointer",
  },
  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px",
    fontSize: "12px",
    color: "#666",
  },
  avatar: {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    background: "#ccc",
  },
  imageWrapper: {
    display: "flex",
    gap: "4px",
    padding: "0 8px",
  },
  mainImageBox: {
    position: "relative",
    flex: 1,
  },
  image: {
    width: "100%",
    height: "280px",
    objectFit: "cover",
    borderRadius: "4px",
  },
  thumbColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  thumb: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  info: {
    padding: "10px",
  },
  exclusive: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#444",
  },
  title: {
    fontSize: "14px",
    margin: "4px 0",
    color: "#222",
  },
  discount: {
    fontSize: "14px",
    fontWeight: "600",
    color: "green",
  },
};

export default ProductCard;
