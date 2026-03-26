import { createContext, useContext, useEffect, useState } from "react";
import { createOrder, getMyOrders } from "../services/endpoints";
import { useAuth } from "./AuthContext";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔄 When user logs in, auto fetch orders
  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [user]);

  // 🔥 Fetch orders from backend
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getMyOrders();
      setOrders(res.data || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Place order (backend connected)
  const placeOrder = async (items, total, extra = {}) => {
    if (!user) {
      throw new Error("User not logged in");
    }

    try {
      const res = await createOrder({
        items,
        total,
        ...extra, // 👈 address, paymentMethod etc support
      });

      // Instantly update UI
      setOrders((prev) => [res.data, ...prev]);

      return res.data; // 👈 useful for success page
    } catch (error) {
      console.error("Order placement failed:", error);
      throw error;
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        fetchOrders,
        placeOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
