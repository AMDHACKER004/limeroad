// import { NavLink } from "react-router-dom";
// import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";

// const menu = [
//   { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
//   { name: "Products", path: "/admin/products", icon: <Package size={18} /> },
//   { name: "Orders", path: "/admin/orders", icon: <ShoppingCart size={18} /> },
//   { name: "Users", path: "/admin/users", icon: <Users size={18} /> },
// ];

// const Sidebar = () => {
//   return (
//     <aside className="w-64 bg-white border-r min-h-screen p-5">
//       <h1 className="text-2xl font-bold mb-10">LimeRoad Admin</h1>

//       <ul className="space-y-2">
//         {menu.map((item) => (
//           <li key={item.name}>
//             <NavLink
//               to={item.path}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ${
//                   isActive
//                     ? "bg-black text-white"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`
//               }
//             >
//               {item.icon}
//               {item.name}
//             </NavLink>
//           </li>
//         ))}
//       </ul>
//     </aside>
//   );
// };

// export default Sidebar;


import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";

const menu = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
  { name: "Products", path: "/admin/products", icon: <Package size={18} /> },
  { name: "Orders", path: "/admin/orders", icon: <ShoppingCart size={18} /> },
  { name: "Users", path: "/admin/users", icon: <Users size={18} /> },
];

const Sidebar = () => {
  return (
    <>
      <aside className="admin-sidebar">
        <h1 className="sidebar-logo">LimeRoad Admin</h1>

        <ul className="sidebar-menu">
          {menu.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
              >
                <span className="menu-icon">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      {/* INLINE CSS */}
      <style>{`
        .admin-sidebar {
          width: 250px;
          background: #ffffff;
          border-right: 1px solid #f0f0f0;
          min-height: 100vh;
          padding: 30px 20px;
        }

        .sidebar-logo {
          font-size: 24px;
          font-weight: 800;
          color: #00bfa5;
          margin-bottom: 40px;
        }

        .sidebar-menu {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .menu-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 14px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          color: #555;
          transition: all 0.2s ease;
        }

        .menu-link:hover {
          background: #f2fffc;
          color: #00bfa5;
        }

        .menu-link.active {
          background: #00bfa5;
          color: white;
          box-shadow: 0 8px 20px rgba(0,191,165,0.25);
        }

        .menu-icon {
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
