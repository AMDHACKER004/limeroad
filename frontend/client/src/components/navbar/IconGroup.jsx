// // import { useNavigate } from "react-router-dom";
// // import { useState, useRef, useEffect } from "react";
// // import { useCart } from "../../context/CartContext";
// // import { useAuth } from "../../context/AuthContext";

// // const IconGroup = () => {
// //   const navigate = useNavigate();
// //   const { totalItems } = useCart();
// //   const { user, logout } = useAuth();
// //   const [open, setOpen] = useState(false);
// //   const dropdownRef = useRef(null);

// //   useEffect(() => {
// //     const handleClick = (e) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
// //         setOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClick);
// //     return () => document.removeEventListener("mousedown", handleClick);
// //   }, []);

// //   return (
// //     <div style={styles.wrapper}>
// //       {/* Search */}
// //       <span style={styles.icon} onClick={() => navigate("/search")}>
// //         🔍
// //       </span>

// //       {/* Cart */}
// //       <div style={styles.cart} onClick={() => navigate("/cart")}>
// //         🛒
// //         {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
// //       </div>

// //       {/* Profile */}
// //       <div style={styles.profileBox} ref={dropdownRef}>
// //         <span style={styles.icon} onClick={() => setOpen(!open)}>
// //           👤
// //         </span>

// //         {open && (
// //           <div style={styles.dropdown}>
// //             {!user ? (
// //               <>
// //                 <div
// //                   style={styles.menuItem}
// //                   onClick={() => navigate("/login")}
// //                 >
// //                   🔐 Login
// //                 </div>
// //                 <div
// //                   style={styles.menuItem}
// //                   onClick={() => navigate("/signup")}
// //                 >
// //                   ✍️ Create Account
// //                 </div>
// //               </>
// //             ) : (
// //               <>
// //                 <div
// //                   style={styles.menuItem}
// //                   onClick={() => navigate("/orders")}
// //                 >
// //                   📦 My Orders
// //                 </div>

             
// //                 <div
// //                   style={styles.menuItem}
// //                   onClick={() => {
// //                     logout();
// //                     navigate("/login");
// //                   }}
// //                 >
// //                   🚪 Logout
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // const styles = {
// //   wrapper: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: "20px"
// //   },
// //   icon: {
// //     fontSize: "20px",
// //     cursor: "pointer"
// //   },
// //   cart: {
// //     position: "relative",
// //     cursor: "pointer"
// //   },
// //   badge: {
// //     position: "absolute",
// //     top: "-6px",
// //     right: "-8px",
// //     background: "#ff0055",
// //     color: "#fff",
// //     fontSize: "11px",
// //     padding: "2px 6px",
// //     borderRadius: "50%"
// //   },
// //   profileBox: {
// //     position: "relative"
// //   },
// //   dropdown: {
// //     position: "absolute",
// //     right: 0,
// //     top: "40px",
// //     background: "#fff",
// //     borderRadius: "6px",
// //     width: "180px",
// //     boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
// //     zIndex: 999
// //   },
// //   menuItem: {
// //     padding: "12px",
// //     cursor: "pointer",
// //     borderBottom: "1px solid #eee",
// //     fontSize: "14px"
// //   }
// // };

// // export default IconGroup;


// import { useNavigate } from "react-router-dom";
// import { useState, useRef, useEffect } from "react";
// import { useCart } from "../../context/CartContext";
// import { useAuth } from "../../context/AuthContext";

// const IconGroup = () => {
//   const navigate = useNavigate();
//   const { totalItems } = useCart();
//   const { user, logout } = useAuth();
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClick = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, []);

//   return (
//     <div style={styles.wrapper}>
      
//       {/* Search */}
//       <span style={styles.icon} onClick={() => navigate("/search")}>
//         🔍
//       </span>

//       {/* Cart */}
//       <div style={styles.cart} onClick={() => navigate("/cart")}>
//         🛒
//         {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
//       </div>

//       {/* Profile */}
//       <div style={styles.profileBox} ref={dropdownRef}>
        
//         {/* Profile Header (Icon + Name) */}
//         <div
//           style={styles.profileHeader}
//           onClick={() => setOpen(!open)}
//         >
//           <span style={styles.icon}>👤</span>

//           {user && (
//             <span style={styles.userName}>
//               {user.name?.charAt(0).toUpperCase() + user.name?.slice(1)}
//             </span>
//           )}
//         </div>

//         {open && (
//           <div style={styles.dropdown}>
//             {!user ? (
//               <>
//                 <div
//                   style={styles.menuItem}
//                   onClick={() => {
//                     setOpen(false);
//                     navigate("/login");
//                   }}
//                 >
//                   🔐 Login
//                 </div>

//                 <div
//                   style={styles.menuItem}
//                   onClick={() => {
//                     setOpen(false);
//                     navigate("/signup");
//                   }}
//                 >
//                   ✍️ Create Account
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div
//                   style={styles.menuItem}
//                   onClick={() => {
//                     setOpen(false);
//                     navigate("/orders");
//                   }}
//                 >
//                   📦 My Orders
//                 </div>

//                 <div
//                   style={styles.menuItem}
//                   onClick={() => {
//                     logout();
//                     setOpen(false);
//                     navigate("/login");
//                   }}
//                 >
//                   🚪 Logout
//                 </div>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   wrapper: {
//     display: "flex",
//     alignItems: "center",
//     gap: "20px"
//   },
//   icon: {
//     fontSize: "20px",
//     cursor: "pointer"
//   },
//   cart: {
//     position: "relative",
//     cursor: "pointer"
//   },
//   badge: {
//     position: "absolute",
//     top: "-6px",
//     right: "-8px",
//     background: "#ff0055",
//     color: "#fff",
//     fontSize: "11px",
//     padding: "2px 6px",
//     borderRadius: "50%"
//   },
//   profileBox: {
//     position: "relative"
//   },
//   profileHeader: {
//     display: "flex",
//     alignItems: "center",
//     gap: "6px",
//     cursor: "pointer"
//   },
//   userName: {
//     fontSize: "14px",
//     fontWeight: "500",
//     maxWidth: "90px",
//     whiteSpace: "nowrap",
//     overflow: "hidden",
//     textOverflow: "ellipsis"
//   },
//   dropdown: {
//     position: "absolute",
//     right: 0,
//     top: "40px",
//     background: "#fff",
//     borderRadius: "6px",
//     width: "180px",
//     boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
//     zIndex: 999
//   },
//   menuItem: {
//     padding: "12px",
//     cursor: "pointer",
//     borderBottom: "1px solid #eee",
//     fontSize: "14px"
//   }
// };

// export default IconGroup;

import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const IconGroup = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div style={styles.wrapper}>
      
      {/* Search */}
      <span style={styles.icon} onClick={() => navigate("/search")}>
        🔍
      </span>

      {/* Cart */}
      <div style={styles.cart} onClick={() => navigate("/cart")}>
        🛒
        {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
      </div>

      {/* Profile */}
      <div style={styles.profileBox} ref={dropdownRef}>
        
        {/* Only Icon Visible */}
        <span
          style={styles.icon}
          onClick={() => setOpen(!open)}
        >
          👤
        </span>

        {open && (
          <div style={styles.dropdown}>
            {!user ? (
              <>
                <div
                  style={styles.menuItem}
                  onClick={() => {
                    setOpen(false);
                    navigate("/login");
                  }}
                >
                  🔐 Login
                </div>

                <div
                  style={styles.menuItem}
                  onClick={() => {
                    setOpen(false);
                    navigate("/signup");
                  }}
                >
                  ✍️ Create Account
                </div>
              </>
            ) : (
              <>
                {/* 🔥 USER NAME AT TOP */}
                <div style={styles.userInfo}>
                  👋 {user.name?.charAt(0).toUpperCase() + user.name?.slice(1)}
                </div>

                <div
                  style={styles.menuItem}
                  onClick={() => {
                    setOpen(false);
                    navigate("/orders");
                  }}
                >
                  📦 My Orders
                </div>

                <div
                  style={styles.menuItem}
                  onClick={() => {
                    logout();
                    setOpen(false);
                    navigate("/login");
                  }}
                >
                  🚪 Logout
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },
  icon: {
    fontSize: "20px",
    cursor: "pointer"
  },
  cart: {
    position: "relative",
    cursor: "pointer"
  },
  badge: {
    position: "absolute",
    top: "-6px",
    right: "-8px",
    background: "#ff0055",
    color: "#fff",
    fontSize: "11px",
    padding: "2px 6px",
    borderRadius: "50%"
  },
  profileBox: {
    position: "relative"
  },
  dropdown: {
    position: "absolute",
    right: 0,
    top: "40px",
    background: "#fff",
    borderRadius: "6px",
    width: "190px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
    zIndex: 999
  },
  userInfo: {
    padding: "12px",
    fontWeight: "600",
    borderBottom: "1px solid #eee",
    background: "#f8f8f8"
  },
  menuItem: {
    padding: "12px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
    fontSize: "14px"
  }
};

export default IconGroup;