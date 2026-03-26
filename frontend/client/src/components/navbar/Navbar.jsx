import { useNavigate, useLocation } from "react-router-dom";
import TopMenu from "./TopMenu";
import SearchBar from "./SearchBar";
import IconGroup from "./IconGroup";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // cart page check
  const isCartPage = location.pathname === "/cart";

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Left */}
        <div style={styles.left}>
          <h1
            style={styles.logo}
            onClick={() => navigate("/")}
          >
            LimeRoad
          </h1>

          {/* Hide TopMenu on Cart page */}
          {!isCartPage && <TopMenu />}

          {/* My Orders link */}
          {!isCartPage && (
            <span
              style={styles.orders}
              onClick={() => navigate("/orders")}
            >
              My Orders
            </span>
          )}
        </div>

        {/* Right */}
        <div style={styles.right}>
          <SearchBar />
          <IconGroup />
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    height: "64px",
    background: "#ffffff",
    borderBottom: "1px solid #e5e5e5",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },

  container: {
    maxWidth: "1300px",
    height: "100%",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "28px"
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "18px"
  },

  logo: {
    color: "#ff0055",
    fontSize: "26px",
    fontWeight: "700",
    cursor: "pointer",
    lineHeight: "1"
  },

  orders: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
    cursor: "pointer"
  }
};

export default Navbar;