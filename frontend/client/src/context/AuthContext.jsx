import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Safe load user from localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (
        savedUser &&
        savedUser !== "undefined" &&
        savedUser !== "null" &&
        token
      ) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Corrupted localStorage, clearing auth data");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }

    setLoading(false);
  }, []);

  // ✅ Real login (backend user object)
  const login = (userData) => {
    if (!userData) return;

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
