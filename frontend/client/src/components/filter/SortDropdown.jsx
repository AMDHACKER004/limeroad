import { useProducts } from "../../context/ProductContext";

const SortDropdown = () => {
  const { sortBy, setSortBy } = useProducts();

  return (
    <div style={styles.wrapper}>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        style={styles.select}
      >
        <option value="">Sort By</option>
        <option value="low-high">Price: Low to High</option>
        <option value="high-low">Price: High to Low</option>
      </select>
    </div>
  );
};

const styles = {
  wrapper: {
    minWidth: "180px"
  },

  select: {
    width: "100%",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "13px",
    cursor: "pointer",
    background: "#ffffff",
    color: "#333",
    outline: "none"
  }
};

export default SortDropdown;

