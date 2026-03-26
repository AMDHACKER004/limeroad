// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/navbar/Navbar";
// import Footer from "../components/footer/Footer";
// import { useAuth } from "../context/AuthContext";
// import { loginUser } from "../services/endpoints";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login, user } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Already logged in → redirect
//   useEffect(() => {
//     if (user) {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!email || !password) {
//       setError("Please enter email and password");
//       return;
//     }

//     try {
//       setLoading(true);

//       // 🔥 REAL BACKEND CALL
//       const res = await loginUser({ email, password });

//       // Save token
//       localStorage.setItem("token", res.data.token);

//       // Save user in context
//       login(res.data.user);

//       navigate("/");
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Login failed. Try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div style={styles.page}>
//         <form style={styles.card} onSubmit={handleLogin}>
//           <h2 style={styles.heading}>Login</h2>

//           {error && <p style={styles.error}>{error}</p>}

//           <input
//             type="email"
//             placeholder="Email address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={styles.input}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={styles.input}
//           />

//           <button type="submit" style={styles.btn} disabled={loading}>
//             {loading ? "Logging in..." : "LOGIN"}
//           </button>

//           <p style={styles.text}>
//             New to LimeRoad?{" "}
//             <span
//               style={styles.link}
//               onClick={() => navigate("/signup")}
//             >
//               Create Account
//             </span>
//           </p>
//         </form>
//       </div>

//       <Footer />
//     </>
//   );
// };

// const styles = {
//   page: {
//     minHeight: "70vh",
//     background: "#f5f5f5",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   card: {
//     width: "360px",
//     background: "#ffffff",
//     padding: "28px",
//     borderRadius: "10px",
//     border: "1px solid #e5e5e5"
//   },
//   heading: {
//     marginBottom: "18px",
//     fontSize: "22px",
//     textAlign: "center"
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     marginBottom: "12px",
//     borderRadius: "4px",
//     border: "1px solid #ccc"
//   },
//   btn: {
//     width: "100%",
//     padding: "12px",
//     background: "#ff0055",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     fontWeight: "600",
//     cursor: "pointer"
//   },
//   text: {
//     marginTop: "16px",
//     textAlign: "center",
//     fontSize: "13px",
//     color: "#555"
//   },
//   link: {
//     color: "#ff0055",
//     cursor: "pointer",
//     fontWeight: "600"
//   },
//   error: {
//     color: "red",
//     fontSize: "13px",
//     marginBottom: "10px"
//   }
// };

// export default Login;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/endpoints";

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 NEW
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser({ email, password });

      localStorage.setItem("token", res.data.token);
      login(res.data.user);

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <form style={styles.card} onSubmit={handleLogin}>
          <h2 style={styles.heading}>Login</h2>

          {error && <p style={styles.error}>{error}</p>}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          {/* 🔥 PASSWORD FIELD WITH TOGGLE */}
          <div style={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />

            <span
              style={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? "Logging in..." : "LOGIN"}
          </button>

          <p style={styles.text}>
            New to LimeRoad?{" "}
            <span
              style={styles.link}
              onClick={() => navigate("/signup")}
            >
              Create Account
            </span>
          </p>
        </form>
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
    width: "360px",
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
    border: "1px solid #ccc"
  },
  passwordWrapper: {
    position: "relative"
  },
  eyeIcon: {
    position: "absolute",
    right: "12px",
    top: "38%",
    cursor: "pointer",
    fontSize: "16px"
  },
  btn: {
    width: "100%",
    padding: "12px",
    background: "#ff0055",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer"
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
  },
  error: {
    color: "red",
    fontSize: "13px",
    marginBottom: "10px"
  }
};

export default Login;