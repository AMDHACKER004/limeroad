// import { Routes, Route, Navigate } from "react-router-dom";

// import AdminLayout from "../layouts/AdminLayout";
// import ProtectedRoute from "../components/ProtectedRoute";

// import AdminLogin from "../pages/auth/AdminLogin";
// import Dashboard from "../pages/dashboard/Dashboard";
// import ProductList from "../pages/products/ProductList";
// import AddProduct from "../pages/products/AddProduct";
// import Orders from "../pages/orders/Orders";
// import Users from "../pages/users/Users";
// import UserOrders from "../pages/orders/UserOrders"; // 👈 NEW IMPORT

// const AdminRoutes = () => {
//   return (
//     <Routes>

//       {/* Root redirect */}
//       <Route path="/" element={<Navigate to="/admin/login" replace />} />

//       {/* Public route */}
//       <Route path="/admin/login" element={<AdminLogin />} />

//       {/* Protected Admin Routes */}
//       <Route
//         path="/admin"
//         element={
//           <ProtectedRoute>
//             <AdminLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="dashboard" element={<Dashboard />} />
//         <Route path="products" element={<ProductList />} />
//         <Route path="products/add" element={<AddProduct />} />
//         <Route path="orders" element={<Orders />} />
//         <Route path="users" element={<Users />} />

//         {/* 👇 NEW ROUTE */}
//         <Route path="user-orders/:id" element={<UserOrders />} />
//       </Route>

//     </Routes>
//   );
// };

// export default AdminRoutes;

import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";

import AdminLogin from "../pages/auth/AdminLogin";
import Dashboard from "../pages/dashboard/Dashboard";
import ProductList from "../pages/products/ProductList";
import AddProduct from "../pages/products/AddProduct";
import EditProduct from "../pages/products/EditProduct";
import Orders from "../pages/orders/Orders";
import Users from "../pages/users/Users";
import UserOrders from "../pages/orders/UserOrders";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/admin/login" replace />} />

      {/* Public route */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="orders" element={<Orders />} />
        <Route path="users" element={<Users />} />
        <Route path="user-orders/:id" element={<UserOrders />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;