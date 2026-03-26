import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Fetch products error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    // optimistic UI update
    setProducts((prev) => prev.filter((p) => p._id !== id));

    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      alert("Delete failed, refreshing list");
      fetchProducts();
    }
  };

  if (loading) return <h2>Loading products...</h2>;

  return (
    <>
      <div className="products-page">
        {/* Header */}
        <div className="products-header">
          <h1>Products</h1>
          <button
            className="add-btn"
            onClick={() => navigate("/admin/products/add")}
          >
            + Add Product
          </button>
        </div>

        {/* Table */}
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Sizes</th>
                <th>Colors</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p._id}>
                    <td>{p.title}</td>
                    <td>₹{p.price}</td>
                    <td>{p.stock}</td>
                    <td>{p.category}</td>

                    {/* Sizes */}
                    <td>
                      {p.sizes?.length > 0 ? p.sizes.join(", ") : "-"}
                    </td>

                    {/* Colors */}
                    <td>
                      {p.colors?.length > 0 ? p.colors.join(", ") : "-"}
                    </td>

                    <td>
                      <span
                        style={{
                          color: p.isActive ? "green" : "red",
                          fontWeight: 600,
                        }}
                      >
                        {p.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td>
                      <button
                        onClick={() =>
                          navigate(`/admin/products/edit/${p._id}`)
                        }
                        style={{ marginRight: "10px" }}
                      >
                        Edit
                      </button>

                      <button onClick={() => handleDelete(p._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* INLINE CSS */}
      <style>{`
        .products-page {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .products-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .products-header h1 {
          font-size: 26px;
          font-weight: 700;
          color: #222;
        }

        .add-btn {
          background: #00bfa5;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }

        .add-btn:hover {
          opacity: 0.92;
        }

        .table-card {
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #f0f0f0;
          box-shadow: 0 15px 40px rgba(0,0,0,0.04);
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
          padding: 16px;
          font-weight: 600;
          color: #555;
          border-bottom: 1px solid #eee;
        }

        td {
          padding: 16px;
          color: #333;
          border-bottom: 1px solid #f3f3f3;
        }

        tbody tr:hover {
          background: #f6fffd;
        }

        td button {
          padding: 6px 10px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default ProductList;
