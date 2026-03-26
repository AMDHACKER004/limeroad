// // import jwt from "jsonwebtoken";
// // import User from "../models/User.js";

// // const protect = async (req, res, next) => {
// //   try {
// //     let token;

// //     if (
// //       req.headers.authorization &&
// //       req.headers.authorization.startsWith("Bearer")
// //     ) {
// //       token = req.headers.authorization.split(" ")[1];

// //       const decoded = jwt.verify(token, process.env.JWT_SECRET);

// //       req.user = await User.findById(decoded.id).select("-password");

// //       return next(); // pass control to controller
// //     }

// //     return res.status(401).json({ message: "Not authorized, no token" });
// //   } catch (error) {
// //     return res.status(401).json({ message: "Not authorized, token failed" });
// //   }
// // };

// // export default protect;


// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const protect = async (req, res, next) => {
//   try {
//     let token;

//     // ✅ Check Authorization header
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer ")
//     ) {
//       token = req.headers.authorization.split(" ")[1];

//       // ✅ Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // ✅ Attach user to request (password excluded)
//       const user = await User.findById(decoded.id).select("-password");

//       if (!user) {
//         return res.status(401).json({ message: "User not found" });
//       }

//       req.user = user;
//       return next();
//     }

//     return res.status(401).json({ message: "Not authorized, token missing" });
//   } catch (error) {
//     console.error("Auth middleware error:", error.message);
//     return res.status(401).json({ message: "Not authorized, token invalid" });
//   }
// };

// export default protect;


import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    let token;

    // Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ FIX: id OR _id dono handle karo
      const userId = decoded.id || decoded._id;

      const user = await User.findById(userId).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user; // now req.user.isAdmin will work
      next();
      return;
    }

    return res.status(401).json({ message: "Not authorized, token missing" });
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

export default protect;
