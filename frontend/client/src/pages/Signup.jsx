import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { registerUser } from "../services/endpoints";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    setError("");

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // 🔥 REAL BACKEND CALL
      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password
      });

      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Create Account</h2>

          {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}

          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            style={styles.input}
          />

          <button
            style={styles.btn}
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Creating..." : "SIGN UP"}
          </button>

          <p style={styles.text}>
            Already have an account?{" "}
            <span
              style={styles.link}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

const styles = {
  page: {
    minHeight: "70vh",
    background: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    width: "380px",
    background: "#ffffff",
    padding: "28px",
    borderRadius: "10px",
    border: "1px solid #e5e5e5"
  },
  heading: {
    marginBottom: "18px",
    fontSize: "22px",
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },
  btn: {
    width: "100%",
    padding: "12px",
    marginTop: "6px",
    background: "#ff0055",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px"
  },
  text: {
    marginTop: "16px",
    textAlign: "center",
    fontSize: "13px",
    color: "#555"
  },
  link: {
    color: "#ff0055",
    cursor: "pointer",
    fontWeight: "600"
  }
};

export default Signup;
