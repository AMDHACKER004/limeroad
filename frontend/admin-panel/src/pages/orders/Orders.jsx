// import { useEffect, useState } from "react";
// import api from "../../services/api";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchOrders = async () => {
//     try {
//       const res = await api.get("/orders");
//       setOrders(res.data);
//     } catch (error) {
//       console.error("Fetch orders error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   if (loading) return <h2>Loading orders...</h2>;

//   return (
//     <>
//       <div className="orders-page">
//         <h1 className="orders-title">Orders</h1>

//         <div className="orders-card">
//           {orders.length === 0 ? (
//             <p className="orders-empty">No orders yet.</p>
//           ) : (
//             <table>
//               <thead>
//                 <tr>
//                   <th>Order ID</th>
//                   <th>Total</th>
//                   <th>Status</th>
//                   <th>Items</th>
//                   <th>Cancel Req</th>
//                   <th>Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.map((o) => (
//                   <tr key={o._id}>
//                     <td>{o._id.slice(0, 8)}...</td>
//                     <td>₹{o.total}</td>
//                     <td>{o.status}</td>
//                     <td>{o.items?.length || 0}</td>
//                     <td>{o.cancelRequested ? "Yes" : "No"}</td>
//                     <td>{new Date(o.createdAt).toLocaleDateString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>

//       {/* INLINE CSS */}
//       <style>{`
//         .orders-page {
//           display: flex;
//           flex-direction: column;
//           gap: 20px;
//         }

//         .orders-title {
//           font-size: 26px;
//           font-weight: 700;
//           color: #222;
//         }

//         .orders-card {
//           background: #ffffff;
//           padding: 28px;
//           border-radius: 20px;
//           border: 1px solid #f0f0f0;
//           box-shadow: 0 10px 30px rgba(0,0,0,0.04);
//           overflow-x: auto;
//         }

//         table {
//           width: 100%;
//           border-collapse: collapse;
//           font-size: 14px;
//         }

//         thead {
//           background: #f9fafb;
//         }

//         th {
//           text-align: left;
//           padding: 14px;
//           font-weight: 600;
//           color: #555;
//           border-bottom: 1px solid #eee;
//         }

//         td {
//           padding: 14px;
//           color: #333;
//           border-bottom: 1px solid #f3f3f3;
//         }

//         tbody tr:hover {
//           background: #f6fffd;
//         }

//         .orders-empty {
//           color: #999;
//           font-size: 15px;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Orders;


import { useEffect, useState } from "react";
import api from "../../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Fetch orders error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Admin status update function
  const updateStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}`, {
        status: newStatus,
      });
      fetchOrders(); // refresh list
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  if (loading) return <h2>Loading orders...</h2>;

  return (
    <>
      <div className="orders-page">
        <h1 className="orders-title">Orders</h1>

        <div className="orders-card">
          {orders.length === 0 ? (
            <p className="orders-empty">No orders yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Total</th>
                  <th>Status (Admin Control)</th>
                  <th>Items</th>
                  <th>Cancel Req</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id}>
                    <td>{o._id.slice(0, 8)}...</td>
                    <td>₹{o.total}</td>

                    {/* ✅ Admin dropdown control */}
                    <td>
                      <select
                        value={o.status}
                        onChange={(e) => updateStatus(o._id, e.target.value)}
                      >
                        <option value="Placed">Placed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td>{o.items?.length || 0}</td>

                    {/* Better cancel request display */}
                    <td
                      style={{
                        color: o.cancelRequested ? "red" : "green",
                        fontWeight: 600,
                      }}
                    >
                      {o.cancelRequested ? "Pending" : "—"}
                    </td>

                    <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* INLINE CSS */}
      <style>{`
        .orders-page {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .orders-title {
          font-size: 26px;
          font-weight: 700;
          color: #222;
        }

        .orders-card {
          background: #ffffff;
          padding: 28px;
          border-radius: 20px;
          border: 1px solid #f0f0f0;
          box-shadow: 0 10px 30px rgba(0,0,0,0.04);
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        thead {
          background: #f9fafb;
        }

        th {
          text-align: left;
          padding: 14px;
          font-weight: 600;
          color: #555;
          border-bottom: 1px solid #eee;
        }

        td {
          padding: 14px;
          color: #333;
          border-bottom: 1px solid #f3f3f3;
        }

        tbody tr:hover {
          background: #f6fffd;
        }

        select {
          padding: 6px;
          border-radius: 6px;
          border: 1px solid #ddd;
        }

        .orders-empty {
          color: #999;
          font-size: 15px;
        }
      `}</style>
    </>
  );
};

export default Orders;
