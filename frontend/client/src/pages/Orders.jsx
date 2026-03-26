// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/navbar/Navbar";
// import Footer from "../components/footer/Footer";
// import { useAuth } from "../context/AuthContext";
// import { getMyOrders } from "../services/endpoints";

// const Orders = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await getMyOrders();
//         setOrders(res.data || []);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user) fetchOrders();
//     else setLoading(false);
//   }, [user]);

//   if (!user) {
//     return (
//       <>
//         <Navbar />
//         <div style={styles.page}>
//           <div style={styles.emptyBox}>
//             <h3>Please login to view your orders</h3>
//             <button style={styles.loginBtn} onClick={() => navigate("/login")}>
//               Login
//             </button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <div style={styles.page}>
//           <div style={styles.emptyBox}>
//             <p>Loading your orders...</p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />

//       <div style={styles.page}>
//         <div style={styles.container}>
//           <h2 style={styles.heading}>My Orders</h2>

//           {orders.length === 0 ? (
//             <div style={styles.emptyBox}>
//               <p>No orders placed yet.</p>
//             </div>
//           ) : (
//             orders.map((order) => (
//               <div key={order._id} style={styles.card}>
//                 <div style={styles.topRow}>
//                   <span>
//                     <b>Order ID:</b> {order._id}
//                   </span>
//                   <span
//                     style={{
//                       color:
//                         order.status === "Cancelled"
//                           ? "#e53935"
//                           : "#2e7d32",
//                     }}
//                   >
//                     {order.status || "Placed"}
//                   </span>
//                 </div>

//                 <p style={styles.date}>
//                   Ordered on:{" "}
//                   {order.createdAt
//                     ? new Date(order.createdAt).toLocaleDateString()
//                     : "N/A"}
//                 </p>

//                 <div style={styles.items}>
//                   {order.items?.map((item, index) => (
//                     <div key={index} style={styles.itemRow}>
//                       <span>{item.title || item.name}</span>
//                       <span>× {item.qty || 1}</span>
//                     </div>
//                   ))}
//                 </div>

//                 <div style={styles.totalRow}>
//                   <span>Total</span>
//                   <span style={styles.total}>₹{order.total || 0}</span>
//                 </div>

//                 {/* FINAL ECOMMERCE LOGIC */}
//                 {order.cancelRequested ? (
//                   <p style={{ color: "orange", marginTop: "10px" }}>
//                     Cancellation in process (waiting for admin)
//                   </p>
//                 ) : (
//                   <button
//                     style={styles.cancelBtn}
//                     onClick={() =>
//                       navigate(`/cancel-order/${order._id}`, {
//                         state: { order },
//                       })
//                     }
//                   >
//                     Cancel Order
//                   </button>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Orders;

// /* ---------------- STYLES ---------------- */
// const styles = {
//   page: { background: "#f5f5f5", minHeight: "70vh", padding: "20px" },
//   container: { maxWidth: "900px", margin: "0 auto" },
//   heading: { fontSize: "22px", marginBottom: "20px" },
//   emptyBox: {
//     background: "#fff",
//     padding: "40px",
//     borderRadius: "8px",
//     textAlign: "center",
//   },
//   loginBtn: {
//     marginTop: "15px",
//     padding: "10px 20px",
//     background: "#ff0055",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
//   card: {
//     background: "#fff",
//     padding: "18px",
//     marginBottom: "16px",
//     borderRadius: "8px",
//     border: "1px solid #e5e5e5",
//   },
//   topRow: { display: "flex", justifyContent: "space-between" },
//   date: { color: "#777", marginTop: "4px" },
//   items: { marginTop: "10px" },
//   itemRow: { display: "flex", justifyContent: "space-between" },
//   totalRow: {
//     marginTop: "10px",
//     borderTop: "1px solid #eee",
//     paddingTop: "10px",
//     fontWeight: "600",
//   },
//   total: { color: "#ff0055" },
//   cancelBtn: {
//     marginTop: "12px",
//     padding: "8px 14px",
//     background: "#e53935",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
// };


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { useAuth } from "../context/AuthContext";
import { getMyOrders } from "../services/endpoints";

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders();
        setOrders(res.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchOrders();
    else setLoading(false);
  }, [user]);

  if (!user) {
    return (
      <>
        <Navbar />
        <div style={styles.page}>
          <div style={styles.emptyBox}>
            <h3>Please login to view your orders</h3>
            <button style={styles.loginBtn} onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={styles.page}>
          <div style={styles.emptyBox}>
            <p>Loading your orders...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.container}>
          <h2 style={styles.heading}>My Orders</h2>

          {orders.length === 0 ? (
            <div style={styles.emptyBox}>
              <p>No orders placed yet.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} style={styles.card}>
                <div style={styles.topRow}>
                  <span>
                    <b>Order ID:</b> {order._id}
                  </span>
                  <span
                    style={{
                      fontWeight: "600",
                      color:
                        order.status === "Cancelled"
                          ? "#e53935"
                          : order.status === "Shipped"
                          ? "#fb8c00"
                          : order.status === "Delivered"
                          ? "#2e7d32"
                          : "#1976d2",
                    }}
                  >
                    {order.status || "Placed"}
                  </span>
                </div>

                <p style={styles.date}>
                  Ordered on:{" "}
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>

                {/* STATUS MESSAGES */}
                {order.status === "Shipped" && (
                  <p style={{ color: "#fb8c00" }}>
                    📦 Your order has been shipped
                  </p>
                )}

                {order.status === "Delivered" && (
                  <p style={{ color: "#2e7d32" }}>
                    ✅ Your order has been delivered
                  </p>
                )}

                {order.status === "Cancelled" && (
                  <p style={{ color: "#e53935" }}>
                    ❌ Your order was cancelled
                  </p>
                )}

                <div style={styles.items}>
                  {order.items?.map((item, index) => (
                    <div key={index} style={styles.itemRow}>
                      <span>{item.title || item.name}</span>
                      <span>× {item.qty || 1}</span>
                    </div>
                  ))}
                </div>

                <div style={styles.totalRow}>
                  <span>Total</span>
                  <span style={styles.total}>₹{order.total || 0}</span>
                </div>

                {/* FINAL PROFESSIONAL CANCEL LOGIC */}
                {order.cancelRequested ? (
                  <p style={{ color: "orange", marginTop: "10px" }}>
                    ⏳ Cancellation in process (waiting for admin)
                  </p>
                ) : order.status === "Placed" ? (
                  <button
                    style={styles.cancelBtn}
                    onClick={() =>
                      navigate(`/cancel-order/${order._id}`, {
                        state: { order },
                      })
                    }
                  >
                    Cancel Order
                  </button>
                ) : null}
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Orders;

/* ---------------- STYLES ---------------- */
const styles = {
  page: { background: "#f5f5f5", minHeight: "70vh", padding: "20px" },
  container: { maxWidth: "900px", margin: "0 auto" },
  heading: { fontSize: "22px", marginBottom: "20px" },
  emptyBox: {
    background: "#fff",
    padding: "40px",
    borderRadius: "8px",
    textAlign: "center",
  },
  loginBtn: {
    marginTop: "15px",
    padding: "10px 20px",
    background: "#ff0055",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  card: {
    background: "#fff",
    padding: "18px",
    marginBottom: "16px",
    borderRadius: "8px",
    border: "1px solid #e5e5e5",
  },
  topRow: { display: "flex", justifyContent: "space-between" },
  date: { color: "#777", marginTop: "4px" },
  items: { marginTop: "10px" },
  itemRow: { display: "flex", justifyContent: "space-between" },
  totalRow: {
    marginTop: "10px",
    borderTop: "1px solid #eee",
    paddingTop: "10px",
    fontWeight: "600",
  },
  total: { color: "#ff0055" },
  cancelBtn: {
    marginTop: "12px",
    padding: "8px 14px",
    background: "#e53935",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
