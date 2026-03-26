import PriceSlider from "./PriceSlider";
import SortDropdown from "./SortDropdown";

const FilterBar = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {/* Left */}
        <h3 style={styles.title}>Loved by All</h3>

        {/* Center */}
        <div style={styles.center}>
          <PriceSlider />
        </div>

        {/* Right */}
        <div style={styles.right}>
          <SortDropdown />
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

  container: {
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "14px 20px",
    display: "flex",
    alignItems: "center",
    gap: "24px"
  },

  title: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#222",
    minWidth: "130px"
  },

  center: {
    flex: 1,
    display: "flex",
    alignItems: "center"
  },

  right: {
    minWidth: "180px"
  }
};

export default FilterBar;
