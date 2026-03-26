import { useProducts } from "../../context/ProductContext";

const categories = [
  "ALL",
  "WOMEN",
  "MEN",
  "KIDS",
  "DRESSES",
  "KURTAS",
  "SAREES"
];

const CategorySlider = () => {
  const { selectedCategory, setSelectedCategory } = useProducts();

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.slider}>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  ...styles.button,
                  ...(isActive ? styles.active : {})
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    background: "#ffffff",
    borderBottom: "1px solid #e5e5e5"
  },

  /* Centered like LimeRoad */
  container: {
    maxWidth: "1300px",
    margin: "0 auto"
  },

  slider: {
    display: "flex",
    gap: "12px",
    padding: "14px 20px",
    overflowX: "auto"
  },

  button: {
    padding: "8px 18px",
    borderRadius: "999px",
    border: "1px solid #dcdcdc",
    background: "#ffffff",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    whiteSpace: "nowrap",
    color: "#333",
    transition: "border 0.2s ease, color 0.2s ease"
  },

  active: {
    border: "1.5px solid #000",
    fontWeight: "600",
    color: "#000"
  }
};

export default CategorySlider;

