// // // // const admin = (req, res, next) => {
// // // //   if (req.user && req.user.role === "admin") {
// // // //     next();
// // // //   } else {
// // // //     res.status(403).json({ message: "Admin access denied" });
// // // //   }
// // // // };

// // // // export default admin;

// // // const admin = (req, res, next) => {
// // //   if (req.user && req.user.role === "admin") {
// // //     return next(); // important
// // //   }

// // //   res.status(403).json({ message: "Admin access denied" });
// // // };

// // // export default admin;


// // const admin = (req, res, next) => {
// //   if (req.user && req.user.role === "admin") {
// //     return next();
// //   }

// //   return res.status(403).json({ message: "Admin access denied" });
// // };

// // export default admin;


// const admin = (req, res, next) => {
//   if (req.user && req.user.isAdmin === true) {
//     return next();
//   }

//   return res.status(403).json({ message: "Admin access denied" });
// };

// export default admin;


// const admin = (req, res, next) => {
//   try {
//     if (req.user?.isAdmin) {
//       return next();
//     }

//     return res.status(403).json({
//       message: "Admin access denied"
//     });
//   } catch (error) {
//     return res.status(403).json({
//       message: "Admin access denied"
//     });
//   }
// };

// export default admin;

const admin = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      return next();
    }

    return res.status(403).json({
      message: "Admin access denied"
    });
  } catch (error) {
    return res.status(403).json({
      message: "Admin access denied"
    });
  }
};

export default admin;

