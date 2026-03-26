// import { createContext, useContext, useState } from "react";
// import img1 from "../assets/images/1.png";
// import img2 from "../assets/images/2.png";
// import img5 from "../assets/images/5.png";

// const ProductContext = createContext();

// export const ProductProvider = ({ children }) => {
//   /* ---------------- PRODUCTS ---------------- */
//   const [products] = useState([
//     {
//       id: 1,
//       title: "Women Printed Kurta",
//       category: "WOMEN",
//       price: 799,
//       discount: 40,
//       image: img1,
//       moreImages: 21,
//       brand: "Ayushman Das"
//     },
//     {
//       id: 2,
//       title: "Stylish Winter Dress",
//       category: "WOMEN",
//       price: 999,
//       discount: 35,
//       image: img2,
//       moreImages: 35,
//       brand: "Pooja Pandey"
//     },
//     {
//       id: 3,
//       title: "Stylish Winter Dress",
//       category: "WOMEN",
//       price: 989,
//       discount: 35,
//       image: img2,
//       moreImages: 35,
//       brand: "Ayushman Das"
//     },
//     {
//       id: 4,
//       title: "Stylish Winter Dress",
//       category: "WOMEN",
//       price: 989,
//       discount: 35,
//       image: img2,
//       moreImages: 35,
//       brand: "Pooja Pandey"
//     },
//     {
//       id: 5,
//       title: "Men Casual Shirt",
//       category: "MEN",
//       price: 699,
//       discount: 25,
//       image: img5,
//       moreImages: 18,
//       brand: "Ayushman Das"
//     },
//       {
//       id: 6,
//       title: "Men Casual Shirt",
//       category: "KIDS",
//       price: 699,
//       discount: 25,
//       image: img5,
//       moreImages: 18,
//       brand: "Ayushman Das"
//     },
//       {
//       id: 7,
//       title: "Men Casual Shirt",
//       category: "MEN",
//       price: 699,
//       discount: 25,
//       image: img5,
//       moreImages: 18,
//       brand: "Ayushman Das"
//     },
//       {
//       id: 8,
//       title: "Men Casual Shirt",
//       category: "MEN",
//       price: 699,
//       discount: 25,
//       image: img5,
//       moreImages: 18,
//       brand: "Ayushman Das"
//     },
//       {
//       id: 9,
//       title: "Men Casual Shirt",
//       category: "KIDS",
//       price: 699,
//       discount: 25,
//       image: img5,
//       moreImages: 18,
//       brand: "Ayushman Das"
//     },
//       {
//       id: 10,
//       title: "Men Casual Shirt",
//       category: "DRESSES",
//       price: 999,
//       discount: 25,
//       image: img5,
//       moreImages: 18,
//       brand: "Ayushman Das"
//     },
//       {
//       id: 11,
//       title: "Men Casual Shirt",
//       category: "DRESSES",
//       price: 999,
//       discount: 25,
//       image: img5,
//       moreImages: 18,
//       brand: "Ayushman Das"
//     },
//       {
//       id: 12,
//       title: "Men Casual Shirt",
//       category: "KURTAS",
//       price: 999,
//       discount: 25,
//       image: img5,
//       moreImages: 18,
//       brand: "Ayushman Das"
//     },
//       {
//       id: 13,
//       title: "Men Casual Shirt",
//       category: "SAREES",
//       price: 999,
//       discount: 25,
//       image: img5,
//       moreImages: 18,
//       brand: "Ayushman Das"
//     }
//   ]);

//   /* ---------------- FILTER STATES ---------------- */
//   const [selectedCategory, setSelectedCategory] = useState("ALL");
//   const [priceRange, setPriceRange] = useState(15100);
//   const [sortBy, setSortBy] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");

//   /* ---------------- FILTER LOGIC ---------------- */
//   let filteredProducts = [...products];

//   // 1️⃣ Category filter
//   if (selectedCategory !== "ALL") {
//     filteredProducts = filteredProducts.filter(
//       (p) => p.category === selectedCategory
//     );
//   }

//   // 2️⃣ Price filter (Loved by All slider)
//   filteredProducts = filteredProducts.filter(
//     (p) => p.price <= priceRange
//   );

//   // 3️⃣ Search filter (Product name / Brand)
//   if (searchQuery.trim() !== "") {
//     filteredProducts = filteredProducts.filter(
//       (p) =>
//         p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         p.brand.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }

//   // 4️⃣ Sorting
//   if (sortBy === "low-high") {
//     filteredProducts.sort((a, b) => a.price - b.price);
//   }

//   if (sortBy === "high-low") {
//     filteredProducts.sort((a, b) => b.price - a.price);
//   }

//   return (
//     <ProductContext.Provider
//       value={{
//         products,
//         filteredProducts,
//         selectedCategory,
//         setSelectedCategory,
//         priceRange,
//         setPriceRange,
//         sortBy,
//         setSortBy,
//         searchQuery,
//         setSearchQuery
//       }}
//     >
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export const useProducts = () => useContext(ProductContext);

import { createContext, useContext, useEffect, useState } from "react";
import { getAllProducts } from "../services/endpoints";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  /* ---------------- PRODUCTS ---------------- */
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH FROM BACKEND ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res.data); // backend ka real data
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* ---------------- FILTER STATES ---------------- */
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [priceRange, setPriceRange] = useState(100000);
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  /* ---------------- FILTER LOGIC ---------------- */
  let filteredProducts = [...products];

  // 1️⃣ Category filter
  if (selectedCategory !== "ALL") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === selectedCategory
    );
  }

  // 2️⃣ Price filter
  filteredProducts = filteredProducts.filter(
    (p) => p.price <= priceRange
  );

  // 3️⃣ Search filter
  if (searchQuery.trim() !== "") {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // 4️⃣ Sorting
  if (sortBy === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        loading,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
