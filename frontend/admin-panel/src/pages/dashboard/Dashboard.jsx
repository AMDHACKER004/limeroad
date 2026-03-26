// const stats = [
//   { title: "Total Orders", value: "1,245" },
//   { title: "Total Products", value: "320" },
//   { title: "Users", value: "890" },
//   { title: "Revenue", value: "₹2,45,000" },
// ];

// const Dashboard = () => {
//   return (
//     <>
//       <div className="dashboard">
//         <h1 className="dashboard-title">Dashboard</h1>

//         <div className="stats-grid">
//           {stats.map((item) => (
//             <div key={item.title} className="stat-card">
//               <p className="stat-title">{item.title}</p>
//               <h2 className="stat-value">{item.value}</h2>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* INLINE CSS */}
//       <style>{`
//         .dashboard {
//           display: flex;
//           flex-direction: column;
//           gap: 25px;
//         }

//         .dashboard-title {
//           font-size: 26px;
//           font-weight: 700;
//           color: #222;
//         }

//         .stats-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
//           gap: 20px;
//         }

//         .stat-card {
//           background: #ffffff;
//           border-radius: 20px;
//           padding: 26px;
//           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
//           border: 1px solid #f0f0f0;
//           transition: 0.2s ease;
//         }

//         .stat-card:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 15px 35px rgba(0, 0, 0, 0.06);
//         }

//         .stat-title {
//           font-size: 14px;
//           color: #888;
//           margin-bottom: 8px;
//         }

//         .stat-value {
//           font-size: 28px;
//           font-weight: 700;
//           color: #00bfa5;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Dashboard;


import { useEffect, useState } from "react";
import api from "../../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [ordersRes, productsRes, usersRes] = await Promise.all([
          api.get("/orders"),
          api.get("/products"),
          api.get("/users"),
        ]);

        const totalRevenue = ordersRes.data.reduce(
          (sum, order) => sum + (order.totalAmount || 0),
          0
        );

        setStats([
          { title: "Total Orders", value: ordersRes.data.length },
          { title: "Total Products", value: productsRes.data.length },
          { title: "Users", value: usersRes.data.length },
          { title: "Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}` },
        ]);
      } catch (error) {
        console.error("Dashboard API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <h2>Loading dashboard...</h2>;
  }

  return (
    <>
      <div className="dashboard">
        <h1 className="dashboard-title">Dashboard</h1>

        <div className="stats-grid">
          {stats.map((item) => (
            <div key={item.title} className="stat-card">
              <p className="stat-title">{item.title}</p>
              <h2 className="stat-value">{item.value}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* INLINE CSS */}
      <style>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .dashboard-title {
          font-size: 26px;
          font-weight: 700;
          color: #222;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .stat-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 26px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
          border: 1px solid #f0f0f0;
          transition: 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.06);
        }

        .stat-title {
          font-size: 14px;
          color: #888;
          margin-bottom: 8px;
        }

        .stat-value {
          font-size: 28px;
          font-weight: 700;
          color: #00bfa5;
        }
      `}</style>
    </>
  );
};

export default Dashboard;
