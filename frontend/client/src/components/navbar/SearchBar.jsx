import { useProducts } from "../../context/ProductContext.jsx";

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useProducts();

  return (
    <input
      type="text"
      placeholder="Search by product, brand"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={styles.input}
    />
  );
};

const styles = {
  input: {
    width: "300px",
    height: "36px",
    background: "#f5f5f5",
    color: "#333",
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "0 12px",
    fontSize: "13px",
    outline: "none"
  }
};

export default SearchBar;

