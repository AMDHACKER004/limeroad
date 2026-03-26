import { useProducts } from "../../context/ProductContext";

const CategoryItem = ({ title, image }) => {
  const { selectedCategory, setSelectedCategory } = useProducts();
  const isActive = selectedCategory === title;

  return (
    <div
      style={{
        ...styles.wrapper,
        ...(isActive ? styles.activeWrapper : {})
      }}
      onClick={() => setSelectedCategory(title)}
    >
      <div
        style={{
          ...styles.imageWrapper,
          ...(isActive ? styles.activeImageWrapper : {})
        }}
      >
        <img src={image} alt={title} style={styles.image} />
      </div>

      <p
        style={{
          ...styles.text,
          ...(isActive ? styles.activeText : {})
        }}
      >
        {title}
      </p>
    </div>
  );
};

const styles = {
  /* Outer wrapper */
  wrapper: {
    minWidth: "110px",
    textAlign: "center",
    cursor: "pointer",
    color: "#333",
    transition: "transform 0.2s ease"
  },

  /* Oval pill */
  imageWrapper: {
    width: "96px",
    height: "42px",
    borderRadius: "22px", // oval shape
    border: "1px solid #dcdcdc",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 6px",
    transition: "border 0.2s ease, box-shadow 0.2s ease"
  },

  image: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    objectFit: "cover"
  },

  text: {
    fontSize: "13px",
    fontWeight: "500",
    marginTop: "2px",
    color: "#444"
  },

  /* Active state */
  activeWrapper: {
    transform: "translateY(-1px)"
  },

  activeImageWrapper: {
    border: "1.5px solid #000",
    boxShadow: "0 2px 6px rgba(0,0,0,0.12)"
  },

  activeText: {
    fontWeight: "600",
    color: "#000"
  }
};

export default CategoryItem;
