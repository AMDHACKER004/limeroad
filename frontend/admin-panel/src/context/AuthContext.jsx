// // import { createContext, useEffect, useState } from "react";
// // import api from "../services/api";
// // import { STORAGE_KEYS } from "../utils/constants";

// // export const AuthContext = createContext();

// // const AuthProvider = ({ children }) => {
// //   const [admin, setAdmin] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   // Restore login safely
// //   useEffect(() => {
// //     try {
// //       const savedAdmin = localStorage.getItem(STORAGE_KEYS.ADMIN_DATA);
// //       if (savedAdmin) {
// //         setAdmin(JSON.parse(savedAdmin));
// //       }
// //     } catch (err) {
// //       console.error("Invalid admin data in storage");
// //       localStorage.removeItem(STORAGE_KEYS.ADMIN_DATA);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   // Safe login (no crash even if backend down)
// //   const login = async (email, password) => {
// //     try {
// //       const { data } = await api.post("/admin/login", { email, password });

// //       localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, data.token);
// //       localStorage.setItem(STORAGE_KEYS.ADMIN_DATA, JSON.stringify(data.admin));

// //       setAdmin(data.admin);
// //       return { success: true };
// //     } catch (error) {
// //       console.error("Login failed:", error);
// //       return { success: false, message: "Login failed" };
// //     }
// //   };

// //   const logout = () => {
// //     localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
// //     localStorage.removeItem(STORAGE_KEYS.ADMIN_DATA);
// //     setAdmin(null);
// //   };

// //   return (
// //     <AuthContext.Provider value={{ admin, login, logout, loading }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export default AuthProvider;


// import { createContext, useEffect, useState } from "react";
// import { STORAGE_KEYS } from "../utils/constants";

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [admin, setAdmin] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Restore login from localStorage
//   useEffect(() => {
//     try {
//       const savedAdmin = localStorage.getItem(STORAGE_KEYS.ADMIN_DATA);
//       if (savedAdmin) {
//         setAdmin(JSON.parse(savedAdmin));
//       }
//     } catch (err) {
//       console.error("Invalid admin data in storage");
//       localStorage.removeItem(STORAGE_KEYS.ADMIN_DATA);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // ✅ New login (accept backend response)
//   const login = (data) => {
//     try {
//       localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, data.token);
//       localStorage.setItem(
//         STORAGE_KEYS.ADMIN_DATA,
//         JSON.stringify(data.user)
//       );

//       setAdmin(data.user);
//     } catch (err) {
//       console.error("Saving login failed:", err);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
//     localStorage.removeItem(STORAGE_KEYS.ADMIN_DATA);
//     setAdmin(null);
//   };

//   return (
//     <AuthContext.Provider value={{ admin, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

import { createContext, useEffect, useState, useCallback } from "react";
import { STORAGE_KEYS } from "../utils/constants";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Restore session on refresh (professional pattern)
  useEffect(() => {
    const restoreSession = () => {
      try {
        const savedAdmin = localStorage.getItem(STORAGE_KEYS.ADMIN_DATA);

        if (savedAdmin) {
          setAdmin(JSON.parse(savedAdmin));
        }
      } catch (err) {
        console.error("Corrupted admin data, clearing storage");
        localStorage.removeItem(STORAGE_KEYS.ADMIN_DATA);
        localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // ✅ Professional login handler
  const login = useCallback((data) => {
    try {
      if (!data?.token || !data?.user) {
        throw new Error("Invalid login response");
      }

      localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, data.token);
      localStorage.setItem(
        STORAGE_KEYS.ADMIN_DATA,
        JSON.stringify(data.user)
      );

      setAdmin(data.user);
    } catch (err) {
      console.error("Login failed:", err.message);
    }
  }, []);

  // ✅ Professional logout handler
  const logout = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.ADMIN_DATA);
      setAdmin(null);
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
