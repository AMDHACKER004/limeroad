// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../../services/api";

// const UserOrders = () => {
//   const { id } = useParams(); 
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchUserOrders = async () => {
//     try {
//       // ✅ CORRECT API PATH
//       const res = await api.get(`/orders/admin/user/${id}/orders`);
//       setOrders(res.data);
//     } catch (error) {
//       console.error("Fetch user orders error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserOrders();
//   }, [id]);

//   if (loading) return <h2>Loading orders...</h2>;

//   return (
//     <>
//       <div className="orders-page">
//         <h1 className="orders-title">User Orders</h1>

//         <div className="orders-card">
//           {orders.length === 0 ? (
//             <p className="orders-empty">No orders found for this user.</p>
//           ) : (
//             <table>
//               <thead>
//                 <tr>
//                   <th>Order ID</th>
//                   <th>Total</th>
//                   <th>Status</th>
//                   <th>Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.map((o) => (
//                   <tr key={o._id}>
//                     <td>{o._id}</td>
//                     <td>₹{o.total}</td>
//                     <td style={{ textTransform: "capitalize" }}>{o.status}</td>
//                     <td>{new Date(o.createdAt).toLocaleDateString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>

//       {/* INLINE CSS (as you wanted) */}
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

// export default UserOrders;


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

const UserOrders = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null); // 👈 modal state

  const fetchUserOrders = async () => {
    try {
      const res = await api.get(`/orders/admin/user/${id}/orders`);
      setOrders(res.data);
    } catch (error) {
      console.error("Fetch user orders error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [id]);

  if (loading) return <h2>Loading orders...</h2>;

  return (
    <>
      <div className="orders-page">
        <h1 className="orders-title">User Orders</h1>

        <div className="orders-card">
          {orders.length === 0 ? (
            <p className="orders-empty">No orders found for this user.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id}>
                    <td>{o._id}</td>
                    <td>₹{o.total}</td>
                    <td style={{ textTransform: "capitalize" }}>{o.status}</td>
                    <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button className="view-btn" onClick={() => setSelectedOrder(o)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ---------------- MODAL ---------------- */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Order Details</h2>

            <p><b>Order ID:</b> {selectedOrder._id}</p>
            <p><b>Status:</b> {selectedOrder.status}</p>
            <p><b>Total:</b> ₹{selectedOrder.total}</p>
            <p><b>Payment:</b> {selectedOrder.paymentMethod}</p>

            <h3>Items:</h3>
            <ul>
              {selectedOrder.items?.map((item, i) => (
                <li key={i}>
                  {item.name} × {item.quantity} — ₹{item.price}
                </li>
              ))}
            </ul>

            <button className="close-btn" onClick={() => setSelectedOrder(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* ---------------- INLINE CSS ---------------- */}
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

        .orders-empty {
          color: #999;
          font-size: 15px;
        }

        .view-btn {
          background: #2563eb;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
        }

        .view-btn:hover {
          background: #1d4ed8;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          background: rgba(0,0,0,0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }

        .modal {
          background: white;
          padding: 25px;
          border-radius: 16px;
          width: 420px;
          max-height: 80vh;
          overflow-y: auto;
        }

        .close-btn {
          margin-top: 15px;
          background: #ef4444;
          color: white;
          border: none;
          padding: 8px 14px;
          border-radius: 8px;
          cursor: pointer;
        }

        .close-btn:hover {
          background: #dc2626;
        }
      `}</style>
    </>
  );
};

export default UserOrders;
