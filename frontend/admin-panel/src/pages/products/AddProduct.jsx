import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    discount: "",
    brand: "LimeRoad",
    image: "",
    category: "",
    description: "",
    stock: "",
    sizes: "",     // ✅ NEW
    colors: "",    // ✅ NEW
    isActive: true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.price || !formData.image || !formData.category) {
      return alert("Please fill all required fields");
    }

    try {
      setLoading(true);

      const payload = {
        title: formData.title,
        price: Number(formData.price),
        discount: Number(formData.discount || 0),
        brand: formData.brand,
        image: formData.image,
        category: formData.category.toUpperCase(),
        description: formData.description,
        stock: Number(formData.stock || 10),
        isActive: formData.isActive,

        // ✅ Convert comma string to array
        sizes: formData.sizes
          ? formData.sizes.split(",").map((s) => s.trim())
          : [],
        colors: formData.colors
          ? formData.colors.split(",").map((c) => c.trim())
          : [],
      };

      await api.post("/products", payload);

      alert("Product added successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Add product error:", error);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="add-product-page">
        <h1 className="add-title">Add Product</h1>

        <div className="form-card">
          <div className="input-group">
            <label>Product Title *</label>
            <input name="title" value={formData.title} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Price *</label>
            <input name="price" type="number" value={formData.price} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Discount (%)</label>
            <input name="discount" type="number" value={formData.discount} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Brand</label>
            <input name="brand" value={formData.brand} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Stock</label>
            <input name="stock" type="number" value={formData.stock} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Category *</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="MEN, WOMEN, KIDS"
            />
          </div>

          <div className="input-group">
            <label>Image URL *</label>
            <input name="image" value={formData.image} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* ✅ NEW SIZE FIELD */}
          <div className="input-group">
            <label>Sizes (comma separated)</label>
            <input
              name="sizes"
              value={formData.sizes}
              onChange={handleChange}
              placeholder="S, M, L, XL"
            />
          </div>

          {/* ✅ NEW COLOR FIELD */}
          <div className="input-group">
            <label>Colors (comma separated)</label>
            <input
              name="colors"
              value={formData.colors}
              onChange={handleChange}
              placeholder="Red, Black, Blue"
            />
          </div>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
              />
              Product Active
            </label>
          </div>

          <button className="save-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Product"}
          </button>
        </div>
      </div>

      {/* INLINE CSS */}
      <style>{`
        .add-product-page {
          max-width: 600px;
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .add-title {
          font-size: 26px;
          font-weight: 700;
          color: #222;
        }

        .form-card {
          background: #ffffff;
          padding: 30px;
          border-radius: 22px;
          border: 1px solid #f0f0f0;
          box-shadow: 0 15px 40px rgba(0,0,0,0.04);
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .input-group label {
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }

        .input-group input,
        .input-group textarea {
          padding: 12px 14px;
          border-radius: 14px;
          border: 1px solid #ddd;
          font-size: 14px;
          outline: none;
          transition: 0.2s ease;
        }

        .input-group input:focus,
        .input-group textarea:focus {
          border-color: #00bfa5;
          box-shadow: 0 0 0 2px rgba(0,191,165,0.1);
        }

        .checkbox-group {
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }

        .checkbox-group input {
          margin-right: 8px;
        }

        .save-btn {
          margin-top: 10px;
          background: #00bfa5;
          border: none;
          color: white;
          padding: 12px;
          font-size: 15px;
          font-weight: 600;
          border-radius: 16px;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .save-btn:hover {
          opacity: 0.92;
        }

        .save-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
};

export default AddProduct;
