import { useEffect, useState } from "react";

import Navbar from "../components/navbar/Navbar";
import CategorySlider from "../components/category/CategorySlider";
import FilterBar from "../components/filter/FilterBar";
import ProductGrid from "../components/product/ProductGrid";
import Footer from "../components/footer/Footer";

import { getAllProducts } from "../services/endpoints";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res.data); // backend se jo data aa raha
        console.log("Products:", res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <CategorySlider />
      <FilterBar />
      <ProductGrid products={products} />
      <Footer />
    </>
  );
};

export default Home;
