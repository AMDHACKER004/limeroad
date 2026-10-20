import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/constants";

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
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${BASE_URL}/auth/admin/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 20000,
        }
      );

      if (!res.data?.token || !res.data?.user) {
        throw new Error("Invalid login response from server");
      }

      login(res.data);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      console.error(
        "Admin login error:",
        err.response?.data || err.message
      );

      if (err.response) {
        setError(
          err.response.data?.message ||
            `Login failed (HTTP ${err.response.status})`
        );
      } else if (err.code === "ECONNABORTED") {
        setError("Server response timed out. Please try again.");
      } else {
        setError(
          "Cannot connect to the server. Please try again later."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <h1>LimeRoad Admin</h1>
            <p>Login to manage dashboard</p>
          </div>

          {error && (
            <div className="error-box" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="admin-email">Email</label>
              <input
                id="admin-email"
                type="email"
                name="email"
                autoComplete="username"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                type="password"
                name="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="footer-text">
            © 2026 LimeRoad Admin Panel
          </p>
        </div>
      </div>

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
          box-sizing: border-box;
        }

        .login-card {
          width: 100%;
          max-width: 400px;
          box-sizing: border-box;
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
          margin: 0 0 5px;
        }

        .login-header p {
          font-size: 14px;
          color: #777;
        }

        .error-box {
          background: #ffecec;
          color: #d63031;
          padding: 12px;
          border-radius: 10px;
          font-size: 14px;
          margin-bottom: 18px;
          overflow-wrap: anywhere;
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
          width: 100%;
          box-sizing: border-box;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid #ddd;
          outline: none;
          font-size: 14px;
        }

        .input-group input:focus {
          border-color: #00bfa5;
        }

        .login-card button {
          width: 100%;
          background: #00bfa5;
          border: none;
          color: white;
          padding: 12px;
          font-size: 15px;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .login-card button:hover {
          opacity: 0.9;
        }

        .login-card button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .footer-text {
          text-align: center;
          font-size: 12px;
          color: #aaa;
          margin-top: 25px;
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 30px 22px;
          }
        }
      `}</style>
    </>
  );
};

export default AdminLogin;
