// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import { Outlet } from "react-router-dom";

// const AdminLayout = () => {
//   return (
//     <div className="flex min-h-screen bg-gray-50">
      
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Right side */}
//       <div className="flex flex-col flex-1">
        
//         {/* Top Navbar */}
//         <Navbar />

//         {/* Page Content */}
//         <main className="flex-1 p-6 overflow-y-auto">
//           <div className="bg-white rounded-2xl shadow-sm p-6 min-h-[80vh]">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;


import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <div className="admin-layout">
        {/* Sidebar */}
        <Sidebar />

        {/* Right side */}
        <div className="admin-right">
          {/* Top Navbar */}
          <Navbar />

          {/* Page Content */}
          <main className="admin-main">
            <div className="admin-content-card">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      {/* INLINE CSS */}
      <style>{`
        body {
          background: #f6f7fb;
          font-family: "Segoe UI", sans-serif;
        }

        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: #f6f7fb;
        }

        .admin-right {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .admin-main {
          flex: 1;
          padding: 25px;
          overflow-y: auto;
        }

        .admin-content-card {
          background: #ffffff;
          border-radius: 22px;
          padding: 28px;
          min-height: 80vh;
          border: 1px solid #f0f0f0;
          box-shadow: 0 15px 40px rgba(0,0,0,0.04);
        }
      `}</style>
    </>
  );
};

export default AdminLayout;
