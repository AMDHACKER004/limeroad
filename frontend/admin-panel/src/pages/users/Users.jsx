// import { useEffect, useState } from "react";
// import api from "../../services/api";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchUsers = async () => {
//     try {
//       const res = await api.get("/users");
//       setUsers(res.data);
//     } catch (error) {
//       console.error("Fetch users error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   if (loading) return <h2>Loading users...</h2>;

//   return (
//     <>
//       <div className="users-page">
//         <h1 className="users-title">Users</h1>

//         <div className="users-card">
//           {users.length === 0 ? (
//             <p className="users-empty">No users found.</p>
//           ) : (
//             <table>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Role</th>
//                   <th>Joined</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((u) => (
//                   <tr key={u._id}>
//                     <td>{u.name}</td>
//                     <td>{u.email}</td>
//                     <td style={{ textTransform: "capitalize" }}>{u.role}</td>
//                     <td>{new Date(u.createdAt).toLocaleDateString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>

//       {/* INLINE CSS */}
//       <style>{`
//         .users-page {
//           display: flex;
//           flex-direction: column;
//           gap: 20px;
//         }

//         .users-title {
//           font-size: 26px;
//           font-weight: 700;
//           color: #222;
//         }

//         .users-card {
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

//         .users-empty {
//           color: #999;
//           font-size: 15px;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Users;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // 👈 NEW

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Fetch users error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <h2>Loading users...</h2>;

  return (
    <>
      <div className="users-page">
        <h1 className="users-title">Users</h1>

        <div className="users-card">
          {users.length === 0 ? (
            <p className="users-empty">No users found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td style={{ textTransform: "capitalize" }}>{u.role}</td>
                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>

                    {/* 👇 NEW BUTTON */}
                    <td>
                      <button
                        className="view-btn"
                        onClick={() => navigate(`/admin/user-orders/${u._id}`)}
                      >
                        View Orders
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* INLINE CSS */}
      <style>{`
        .users-page {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .users-title {
          font-size: 26px;
          font-weight: 700;
          color: #222;
        }

        .users-card {
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

        .users-empty {
          color: #999;
          font-size: 15px;
        }

        .view-btn {
          background: #10b981;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
        }

        .view-btn:hover {
          background: #059669;
        }
      `}</style>
    </>
  );
};

export default Users;

