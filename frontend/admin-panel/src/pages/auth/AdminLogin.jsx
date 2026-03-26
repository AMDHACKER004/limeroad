import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/admin/login",
        formData
      );

      login(res.data);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="login-card">
          
          {/* Branding */}
          <div className="login-header">
            <h1>LimeRoad Admin</h1>
            <p>Login to manage dashboard</p>
          </div>

          {/* Error */}
          {error && <div className="error-box">{error}</div>}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••"
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="footer-text">© 2026 LimeRoad Admin Panel</p>
        </div>
      </div>

      {/* INLINE CSS */}
      <style>{`
        body {
          background: #f6f7fb;
          font-family: "Segoe UI", sans-serif;
        }

        .login-wrapper {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .login-card {
          width: 100%;
          max-width: 400px;
          background: #ffffff;
          padding: 40px 30px;
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.05);
        }

        .login-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .login-header h1 {
          font-size: 28px;
          color: #00bfa5;
          margin-bottom: 5px;
        }

        .login-header p {
          font-size: 14px;
          color: #777;
        }

        .error-box {
          background: #ffecec;
          color: #d63031;
          padding: 10px;
          border-radius: 10px;
          font-size: 14px;
          margin-bottom: 15px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 18px;
        }

        .input-group label {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 6px;
          color: #333;
        }

        .input-group input {
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid #ddd;
          outline: none;
          font-size: 14px;
        }

        .input-group input:focus {
          border-color: #00bfa5;
        }

        button {
          width: 100%;
          background: #00bfa5;
          border: none;
          color: white;
          padding: 12px;
          font-size: 15px;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: 0.2s;
        }

        button:hover {
          opacity: 0.9;
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .footer-text {
          text-align: center;
          font-size: 12px;
          color: #aaa;
          margin-top: 25px;
        }
      `}</style>
    </>
  );
};

export default AdminLogin;
