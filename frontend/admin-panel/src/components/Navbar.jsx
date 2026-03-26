// // import { useContext } from "react";
// // import { AuthContext } from "../context/AuthContext";

// // const Navbar = () => {
// //   const { admin, logout } = useContext(AuthContext);

// //   return (
// //     <header className="h-16 bg-white border-b px-6 flex justify-between items-center">
// //       <h2 className="font-semibold text-lg">Dashboard</h2>

// //       <div className="flex items-center gap-4">
// //         <div className="text-right">
// //           <p className="text-sm font-medium">{admin?.email || "Admin"}</p>
// //           <p className="text-xs text-gray-500">Administrator</p>
// //         </div>

// //         <button
// //           onClick={logout}
// //           className="bg-black text-white text-sm px-4 py-1.5 rounded-lg hover:opacity-90"
// //         >
// //           Logout
// //         </button>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Navbar;


// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const Navbar = () => {
//   const { admin, logout } = useContext(AuthContext);

//   return (
//     <>
//       <header className="admin-navbar">
//         <h2 className="nav-title">Dashboard</h2>

//         <div className="nav-right">
//           <div className="admin-info">
//             <p className="admin-email">{admin?.email || "Admin"}</p>
//             <p className="admin-role">Administrator</p>
//           </div>

//           <button onClick={logout} className="logout-btn">
//             Logout
//           </button>
//         </div>
//       </header>

//       {/* INLINE CSS */}
//       <style>{`
//         .admin-navbar {
//           height: 65px;
//           background: #ffffff;
//           border-bottom: 1px solid #f0f0f0;
//           padding: 0 25px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .nav-title {
//           font-size: 20px;
//           font-weight: 700;
//           color: #222;
//         }

//         .nav-right {
//           display: flex;
//           align-items: center;
//           gap: 20px;
//         }

//         .admin-info {
//           text-align: right;
//         }

//         .admin-email {
//           font-size: 14px;
//           font-weight: 600;
//           color: #333;
//         }

//         .admin-role {
//           font-size: 12px;
//           color: #999;
//         }

//         .logout-btn {
//           background: #00bfa5;
//           color: white;
//           border: none;
//           padding: 8px 16px;
//           font-size: 14px;
//           font-weight: 600;
//           border-radius: 14px;
//           cursor: pointer;
//           transition: 0.2s;
//         }

//         .logout-btn:hover {
//           opacity: 0.92;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Navbar;


import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { admin, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Route based title
  const getTitle = () => {
    if (location.pathname.includes("dashboard")) return "Dashboard";
    if (location.pathname.includes("products")) return "Products";
    if (location.pathname.includes("orders")) return "Orders";
    if (location.pathname.includes("users")) return "Users";
    return "Admin Panel";
  };

  // ✅ Professional logout handler
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    // Clear context
    logout();

    // Clear localStorage/sessionStorage (important for real apps)
    localStorage.removeItem("admin");
    localStorage.removeItem("token");

    // Redirect to login
    navigate("/admin/login");
  };

  return (
    <>
      <header className="admin-navbar">
        <h2 className="nav-title">{getTitle()}</h2>

        <div className="nav-right">
          <div className="admin-info">
            <p className="admin-email">{admin?.email || "Admin"}</p>
            <p className="admin-role">Administrator</p>
          </div>

          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      {/* CSS unchanged */}
      <style>{`
        .admin-navbar {
          height: 65px;
          background: #ffffff;
          border-bottom: 1px solid #f0f0f0;
          padding: 0 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-title {
          font-size: 20px;
          font-weight: 700;
          color: #222;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .admin-info {
          text-align: right;
        }

        .admin-email {
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }

        .admin-role {
          font-size: 12px;
          color: #999;
        }

        .logout-btn {
          background: #00bfa5;
          color: white;
          border: none;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 14px;
          cursor: pointer;
          transition: 0.2s;
        }

        .logout-btn:hover {
          opacity: 0.92;
        }
      `}</style>
    </>
  );
};

export default Navbar;
