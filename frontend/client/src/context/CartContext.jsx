// import { createContext, useContext, useEffect, useMemo, useState } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const STORAGE_KEY = "limeroad_cart";

//   // Load cart from localStorage
//   const [cartItems, setCartItems] = useState(() => {
//     try {
//       const saved = localStorage.getItem(STORAGE_KEY);
//       return saved ? JSON.parse(saved) : [];
//     } catch {
//       return [];
//     }
//   });

//   // Save cart to localStorage
//   useEffect(() => {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
//   }, [cartItems]);

//   /* ---------------- ADD TO CART ---------------- */
//   const addToCart = (product) => {
//     const productId = product._id || product.id;

//     setCartItems((prev) => {
//       const exists = prev.find((item) => item.id === productId);

//       if (exists) {
//         return prev.map((item) =>
//           item.id === productId
//             ? { ...item, qty: item.qty + 1 }
//             : item
//         );
//       }

//       return [
//         ...prev,
//         {
//           ...product,
//           id: productId, // 🔥 normalize id here
//           qty: 1
//         }
//       ];
//     });
//   };

//   /* ---------------- UPDATE QUANTITY ---------------- */
//   const increaseQty = (id) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, qty: item.qty + 1 } : item
//       )
//     );
//   };

//   const decreaseQty = (id) => {
//     setCartItems((prev) =>
//       prev
//         .map((item) =>
//           item.id === id ? { ...item, qty: item.qty - 1 } : item
//         )
//         .filter((item) => item.qty > 0)
//     );
//   };

//   /* ---------------- REMOVE / CLEAR ---------------- */
//   const removeFromCart = (id) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   const clearCart = () => {
//     setCartItems([]);
//     localStorage.removeItem(STORAGE_KEY);
//   };

//   /* ---------------- DERIVED VALUES ---------------- */
//   const totalItems = useMemo(
//     () => cartItems.reduce((sum, item) => sum + item.qty, 0),
//     [cartItems]
//   );

//   const totalPrice = useMemo(
//     () =>
//       cartItems.reduce(
//         (sum, item) => sum + item.price * item.qty,
//         0
//       ),
//     [cartItems]
//   );

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         increaseQty,
//         decreaseQty,
//         removeFromCart,
//         clearCart,
//         totalItems,
//         totalPrice
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);



import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const STORAGE_KEY = "limeroad_cart";

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // helper to normalize id
  const getId = (item) => item._id || item.id;

  /* ---------------- ADD TO CART ---------------- */
  const addToCart = (product) => {
    const productId = product._id || product.id;

    setCartItems((prev) => {
      const exists = prev.find((item) => getId(item) === productId);

      if (exists) {
        return prev.map((item) =>
          getId(item) === productId
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, id: productId, qty: 1 }];
    });
  };

  /* ---------------- UPDATE QUANTITY ---------------- */
  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        getId(item) === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          getId(item) === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  /* ---------------- REMOVE ---------------- */
  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => getId(item) !== id)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  /* ---------------- TOTALS ---------------- */
  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.qty, 0),
    [cartItems]
  );

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
