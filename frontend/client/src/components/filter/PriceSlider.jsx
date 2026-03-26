import { useProducts } from "../../context/ProductContext";

const PriceSlider = () => {
  const { priceRange, setPriceRange } = useProducts();

  return (
    <div style={styles.wrapper}>
      <span style={styles.price}>₹99</span>

      <div style={styles.sliderBox}>
        <input
          type="range"
          min="99"
          max="15100"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          style={styles.slider}
        />
        <span style={styles.current}>
          ₹{priceRange}
        </span>
      </div>

      <span style={styles.price}>₹15100</span>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flex: 1
  },

  price: {
    fontSize: "13px",
    color: "#555",
    minWidth: "42px"
  },

  sliderBox: {
    position: "relative",
    flex: 1
  },

  slider: {
    width: "100%",
    cursor: "pointer"
  },

  current: {
    position: "absolute",
    top: "-18px",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "12px",
    color: "#333"
  }
};

export default PriceSlider;

