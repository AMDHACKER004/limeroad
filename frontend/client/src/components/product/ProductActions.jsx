// const ProductActions = () => {
//   return (
//     <div style={styles.actions}>
//       {/* Wishlist */}
//       <span
//         style={styles.icon}
//         title="Add to Wishlist"
//       >
//         ♡
//       </span>

//       {/* View / Share */}
//       <span
//         style={styles.icon}
//         title="View Product"
//       >
//         ↗
//       </span>
//     </div>
//   );
// };

// const styles = {
//   actions: {
//     position: "absolute",
//     top: "8px",
//     right: "8px",
//     display: "flex",
//     gap: "6px"
//   },

//   icon: {
//     width: "28px",
//     height: "28px",
//     background: "#ffffff",
//     borderRadius: "50%",
//     cursor: "pointer",
//     fontSize: "14px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
//     transition: "transform 0.15s ease, box-shadow 0.15s ease"
//   }
// };

// export default ProductActions;


const ProductActions = ({ product, onWishlist, onView }) => {
  return (
    <div style={styles.actions}>
      {/* Wishlist */}
      <span
        style={styles.icon}
        title="Add to Wishlist"
        onClick={() => onWishlist(product)}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        ♡
      </span>

      {/* View Product */}
      <span
        style={styles.icon}
        title="View Product"
        onClick={() => onView(product)}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        ↗
      </span>
    </div>
  );
};

const styles = {
  actions: {
    position: "absolute",
    top: "8px",
    right: "8px",
    display: "flex",
    gap: "6px",
    zIndex: 2
  },

  icon: {
    width: "28px",
    height: "28px",
    background: "#ffffff",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    transition: "transform 0.15s ease, box-shadow 0.15s ease"
  }
};

export default ProductActions;
