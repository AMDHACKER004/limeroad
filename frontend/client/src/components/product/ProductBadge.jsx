const ProductBadge = ({ count }) => {
  if (!count) return null;

  return (
    <div style={styles.badge}>
      +{count}
    </div>
  );
};

const styles = {
  badge: {
    position: "absolute",
    bottom: "8px",
    left: "8px",
    background: "rgba(0, 0, 0, 0.7)",
    color: "#ffffff",
    padding: "4px 8px",
    fontSize: "11px",
    fontWeight: "600",
    borderRadius: "12px",
    lineHeight: "1",
    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
    pointerEvents: "none"
  }
};

export default ProductBadge;
