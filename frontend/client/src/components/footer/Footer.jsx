// // // const Footer = () => {
// // //   return (
// // //     <footer style={styles.footer}>
// // //       <div style={styles.container}>
// // //         <div style={styles.top}>
// // //           <div>
// // //             <h4 style={styles.heading}>ONLINE SHOPPING</h4>
// // //             <p style={styles.link}>Men</p>
// // //             <p style={styles.link}>Women</p>
// // //             <p style={styles.link}>Kids</p>
// // //             <p style={styles.link}>Home & Living</p>
// // //           </div>

// // //           <div>
// // //             <h4 style={styles.heading}>CUSTOMER POLICIES</h4>
// // //             <p style={styles.link}>Contact Us</p>
// // //             <p style={styles.link}>FAQ</p>
// // //             <p style={styles.link}>Terms of Use</p>
// // //             <p style={styles.link}>Privacy Policy</p>
// // //           </div>

// // //           <div>
// // //             <h4 style={styles.heading}>ABOUT US</h4>
// // //             <p style={styles.link}>About LimeRoad</p>
// // //             <p style={styles.link}>Careers</p>
// // //             <p style={styles.link}>Press</p>
// // //           </div>

// // //           <div>
// // //             <h4 style={styles.heading}>KEEP IN TOUCH</h4>
// // //             <p style={styles.link}>Facebook</p>
// // //             <p style={styles.link}>Instagram</p>
// // //             <p style={styles.link}>Twitter</p>
// // //           </div>
// // //         </div>

// // //         <div style={styles.bottom}>
// // //           © 2025 LimeRoad Inspired Project | MERN Stack
// // //         </div>
// // //       </div>
// // //     </footer>
// // //   );
// // // };

// // // const styles = {
// // //   footer: {
// // //     background: "#ffffff",
// // //     borderTop: "1px solid #e5e5e5",
// // //     marginTop: "40px"
// // //   },

// // //   container: {
// // //     maxWidth: "1300px",
// // //     margin: "0 auto",
// // //     padding: "40px 20px"
// // //   },

// // //   top: {
// // //     display: "grid",
// // //     gridTemplateColumns: "repeat(4, 1fr)",
// // //     gap: "32px"
// // //   },

// // //   heading: {
// // //     fontSize: "14px",
// // //     fontWeight: "700",
// // //     marginBottom: "12px",
// // //     color: "#111"
// // //   },

// // //   link: {
// // //     fontSize: "13px",
// // //     color: "#555",
// // //     marginBottom: "8px",
// // //     cursor: "pointer"
// // //   },

// // //   bottom: {
// // //     marginTop: "30px",
// // //     borderTop: "1px solid #e5e5e5",
// // //     paddingTop: "15px",
// // //     textAlign: "center",
// // //     fontSize: "13px",
// // //     color: "#777"
// // //   }
// // // };

// // // export default Footer;


// // import { Link } from "react-router-dom";

// // const Footer = () => {
// //   return (
// //     <footer style={styles.footer}>
// //       <div style={styles.container}>
// //         <div style={styles.top}>
// //           <div>
// //             <h4 style={styles.heading}>ONLINE SHOPPING</h4>
// //             <Link to="/products/men" style={styles.link}>Men</Link>
// //             <Link to="/products/women" style={styles.link}>Women</Link>
// //             <Link to="/products/kids" style={styles.link}>Kids</Link>
// //             <Link to="/products/home-living" style={styles.link}>Home & Living</Link>
// //           </div>

// //           <div>
// //             <h4 style={styles.heading}>CUSTOMER POLICIES</h4>
// //             <Link to="/contact" style={styles.link}>Contact Us</Link>
// //             <Link to="/faq" style={styles.link}>FAQ</Link>
// //             <Link to="/terms" style={styles.link}>Terms of Use</Link>
// //             <Link to="/privacy" style={styles.link}>Privacy Policy</Link>
// //           </div>

// //           <div>
// //             <h4 style={styles.heading}>ABOUT US</h4>
// //             <Link to="/about" style={styles.link}>About LimeRoad</Link>
// //             <Link to="/careers" style={styles.link}>Careers</Link>
// //             <Link to="/press" style={styles.link}>Press</Link>
// //           </div>

// //           <div>
// //             <h4 style={styles.heading}>KEEP IN TOUCH</h4>
// //             <a href="https://facebook.com" target="_blank" rel="noreferrer" style={styles.link}>
// //               Facebook
// //             </a>
// //             <a href="https://instagram.com" target="_blank" rel="noreferrer" style={styles.link}>
// //               Instagram
// //             </a>
// //             <a href="https://twitter.com" target="_blank" rel="noreferrer" style={styles.link}>
// //               Twitter
// //             </a>
// //           </div>
// //         </div>

// //         <div style={styles.bottom}>
// //           © 2025 LimeRoad Inspired Project | MERN Stack
// //         </div>
// //       </div>
// //     </footer>
// //   );
// // };

// // const styles = {
// //   footer: {
// //     background: "#ffffff",
// //     borderTop: "1px solid #e5e5e5",
// //     marginTop: "40px",
// //   },

// //   container: {
// //     maxWidth: "1300px",
// //     margin: "0 auto",
// //     padding: "40px 20px",
// //   },

// //   top: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(4, 1fr)",
// //     gap: "32px",
// //   },

// //   heading: {
// //     fontSize: "14px",
// //     fontWeight: "700",
// //     marginBottom: "12px",
// //     color: "#111",
// //   },

// //   link: {
// //     display: "block",
// //     fontSize: "13px",
// //     color: "#555",
// //     marginBottom: "8px",
// //     cursor: "pointer",
// //     textDecoration: "none",
// //   },

// //   bottom: {
// //     marginTop: "30px",
// //     borderTop: "1px solid #e5e5e5",
// //     paddingTop: "15px",
// //     textAlign: "center",
// //     fontSize: "13px",
// //     color: "#777",
// //   },
// // };

// // export default Footer;

// import { useNavigate } from "react-router-dom";

// const Footer = () => {
//   const navigate = useNavigate();

//   const handleCategoryClick = (category) => {
//     navigate("/", { state: { category } });
//   };

//   return (
//     <footer style={styles.footer}>
//       <div style={styles.container}>
//         <div style={styles.top}>
//           <div>
//             <h4 style={styles.heading}>ONLINE SHOPPING</h4>
//             <p style={styles.link} onClick={() => handleCategoryClick("MEN")}>Men</p>
//             <p style={styles.link} onClick={() => handleCategoryClick("WOMEN")}>Women</p>
//             <p style={styles.link} onClick={() => handleCategoryClick("KIDS")}>Kids</p>
//             <p style={styles.link}>Home & Living</p>
//           </div>

//           <div>
//             <h4 style={styles.heading}>CUSTOMER POLICIES</h4>
//             <p style={styles.link}>Contact Us</p>
//             <p style={styles.link}>FAQ</p>
//             <p style={styles.link}>Terms of Use</p>
//             <p style={styles.link}>Privacy Policy</p>
//           </div>

//           <div>
//             <h4 style={styles.heading}>ABOUT US</h4>
//             <p style={styles.link}>About LimeRoad</p>
//             <p style={styles.link}>Careers</p>
//             <p style={styles.link}>Press</p>
//           </div>

//           <div>
//             <h4 style={styles.heading}>KEEP IN TOUCH</h4>
//             <p style={styles.link}>Facebook</p>
//             <p style={styles.link}>Instagram</p>
//             <p style={styles.link}>Twitter</p>
//           </div>
//         </div>

//         <div style={styles.bottom}>
//           © 2025 LimeRoad Inspired Project | MERN Stack
//         </div>
//       </div>
//     </footer>
//   );
// };

// const styles = {
//   footer: {
//     background: "#ffffff",
//     borderTop: "1px solid #e5e5e5",
//     marginTop: "40px"
//   },
//   container: {
//     maxWidth: "1300px",
//     margin: "0 auto",
//     padding: "40px 20px"
//   },
//   top: {
//     display: "grid",
//     gridTemplateColumns: "repeat(4, 1fr)",
//     gap: "32px"
//   },
//   heading: {
//     fontSize: "14px",
//     fontWeight: "700",
//     marginBottom: "12px",
//     color: "#111"
//   },
//   link: {
//     display: "block",
//     fontSize: "13px",
//     color: "#555",
//     marginBottom: "8px",
//     cursor: "pointer",
//     textDecoration: "none"
//   },
//   bottom: {
//     marginTop: "30px",
//     borderTop: "1px solid #e5e5e5",
//     paddingTop: "15px",
//     textAlign: "center",
//     fontSize: "13px",
//     color: "#777"
//   }
// };

// export default Footer;

import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext.jsx";

const Footer = () => {
  const navigate = useNavigate();
  const { setSelectedCategory } = useProducts();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate("/");
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.top}>
          <div>
            <h4 style={styles.heading}>ONLINE SHOPPING</h4>
            <p style={styles.link} onClick={() => handleCategoryClick("MEN")}>Men</p>
            <p style={styles.link} onClick={() => handleCategoryClick("WOMEN")}>Women</p>
            <p style={styles.link} onClick={() => handleCategoryClick("KIDS")}>Kids</p>
            <p style={styles.link} onClick={() => handleCategoryClick("ALL")}>Home & Living</p>
          </div>

          <div>
            <h4 style={styles.heading}>CUSTOMER POLICIES</h4>
            <p style={styles.link}>Contact Us</p>
            <p style={styles.link}>FAQ</p>
            <p style={styles.link}>Terms of Use</p>
            <p style={styles.link}>Privacy Policy</p>
          </div>

          <div>
            <h4 style={styles.heading}>ABOUT US</h4>
            <p style={styles.link}>About LimeRoad</p>
            <p style={styles.link}>Careers</p>
            <p style={styles.link}>Press</p>
          </div>

          <div>
            <h4 style={styles.heading}>KEEP IN TOUCH</h4>
            <p style={styles.link}>Facebook</p>
            <p style={styles.link}>Instagram</p>
            <p style={styles.link}>Twitter</p>
          </div>
        </div>

        <div style={styles.bottom}>
          © 2025 LimeRoad Inspired Project | MERN Stack
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: "#ffffff",
    borderTop: "1px solid #e5e5e5",
    marginTop: "40px",
  },

  container: {
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "40px 20px",
  },

  top: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "32px",
  },

  heading: {
    fontSize: "14px",
    fontWeight: "700",
    marginBottom: "12px",
    color: "#111",
  },

  link: {
    fontSize: "13px",
    color: "#555",
    marginBottom: "8px",
    cursor: "pointer",
  },

  bottom: {
    marginTop: "30px",
    borderTop: "1px solid #e5e5e5",
    paddingTop: "15px",
    textAlign: "center",
    fontSize: "13px",
    color: "#777",
  },
};

export default Footer;