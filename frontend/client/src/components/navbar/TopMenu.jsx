// import { useProducts } from "../../context/ProductContext.jsx";

// const menus = ["WOMEN", "MEN", "KIDS", "HOME", "OFFERS", "VMART"];

// const TopMenu = () => {
//   const { selectedCategory, setSelectedCategory } = useProducts();

//   const handleClick = (item) => {
//     // LimeRoad jaisa behaviour:
//     // WOMEN / MEN / KIDS → category filter
//     // baaki items → ALL (home feed)
//     if (["WOMEN", "MEN", "KIDS"].includes(item)) {
//       setSelectedCategory(item);
//     } else {
//       setSelectedCategory("ALL");
//     }
//   };

//   return (
//     <nav style={styles.menu}>
//       {menus.map((item) => {
//         const isActive = selectedCategory === item;

//         return (
//           <span
//             key={item}
//             onClick={() => handleClick(item)}
//             style={{
//               ...styles.item,
//               ...(isActive ? styles.active : {})
//             }}
//           >
//             {item}
//           </span>
//         );
//       })}
//     </nav>
//   );
// };

// const styles = {
//   menu: {
//     display: "flex",
//     gap: "22px"
//   },

//   item: {
//     fontSize: "14px",
//     fontWeight: "600",
//     cursor: "pointer",
//     color: "#333",
//     paddingBottom: "6px",
//     borderBottom: "2px solid transparent",
//     transition: "color 0.2s ease, border-color 0.2s ease"
//   },

//   active: {
//     color: "#000",
//     borderBottom: "2px solid #000"
//   }
// };

// export default TopMenu;

import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext.jsx";

const menus = ["WOMEN", "MEN", "KIDS", "HOME", "OFFERS", "VMART"];

const TopMenu = () => {
  const navigate = useNavigate();
  const { selectedCategory, setSelectedCategory } = useProducts();

  const handleClick = (item) => {
    if (["WOMEN", "MEN", "KIDS"].includes(item)) {
      setSelectedCategory(item);
    } else {
      setSelectedCategory("ALL");
    }

    navigate("/");
  };

  return (
    <nav style={styles.menu}>
      {menus.map((item) => {
        const isActive =
          (item === "WOMEN" && selectedCategory === "WOMEN") ||
          (item === "MEN" && selectedCategory === "MEN") ||
          (item === "KIDS" && selectedCategory === "KIDS") ||
          (item === "HOME" && selectedCategory === "ALL");

        return (
          <span
            key={item}
            onClick={() => handleClick(item)}
            style={{
              ...styles.item,
              ...(isActive ? styles.active : {}),
            }}
          >
            {item}
          </span>
        );
      })}
    </nav>
  );
};

const styles = {
  menu: {
    display: "flex",
    gap: "22px",
  },

  item: {
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    color: "#333",
    paddingBottom: "6px",
    borderBottom: "2px solid transparent",
    transition: "color 0.2s ease, border-color 0.2s ease",
  },

  active: {
    color: "#000",
    borderBottom: "2px solid #000",
  },
};

export default TopMenu;