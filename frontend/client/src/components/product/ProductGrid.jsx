// // import ProductCard from "./ProductCard";
// // import { useProducts } from "../../context/ProductContext.jsx";

// // const ProductGrid = () => {
// //   const { filteredProducts } = useProducts();

// //   return (
// //     <div style={styles.wrapper}>
// //       <div style={styles.grid}>
// //         {filteredProducts.map((product) => (
// //           <ProductCard key={product.id} product={product} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // const styles = {
// //   /* Page background */
// //   wrapper: {
// //     background: "#f5f5f5",
// //     minHeight: "100vh"
// //   },

// //   /* Grid */
// //   grid: {
// //     maxWidth: "1300px",
// //     margin: "0 auto",
// //     padding: "24px 16px",
// //     display: "grid",
// //     gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
// //     gap: "20px"
// //   }
// // };

// // export default ProductGrid;

// import ProductCard from "./ProductCard";
// import { useProducts } from "../../context/ProductContext.jsx";

// const ProductGrid = () => {
//   const { filteredProducts, loading } = useProducts();

//   if (loading) {
//     return <h2 style={{ textAlign: "center" }}>Loading products...</h2>;
//   }

//   return (
//     <div style={styles.wrapper}>
//       <div style={styles.grid}>
//         {filteredProducts && filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <ProductCard key={product._id} product={product} />
//           ))
//         ) : (
//           <h3 style={{ textAlign: "center" }}>No products found</h3>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   wrapper: {
//     background: "#f5f5f5",
//     minHeight: "100vh",
//   },
//   grid: {
//     maxWidth: "1300px",
//     margin: "0 auto",
//     padding: "24px 16px",
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
//     gap: "20px",
//   },
// };

// export default ProductGrid;


import ProductCard from "./ProductCard";
import { useProducts } from "../../context/ProductContext.jsx";

const ProductGrid = () => {
  const { filteredProducts, loading } = useProducts();

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading products...</h2>;
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.grid}>
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id || product.id}
              product={product}
            />
          ))
        ) : (
          <h3 style={{ textAlign: "center" }}>No products found</h3>
        )}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    background: "#f5f5f5",
    minHeight: "100vh",
  },
  grid: {
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "24px 16px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
  },
};

export default ProductGrid;
