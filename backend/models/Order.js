// // import mongoose from "mongoose";

// // const orderSchema = new mongoose.Schema(
// //   {
// //     user: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true
// //     },

// //     orderItems: [
// //       {
// //         product: {
// //           type: mongoose.Schema.Types.ObjectId,
// //           ref: "Product",
// //           required: true
// //         },
// //         quantity: {
// //           type: Number,
// //           required: true
// //         }
// //       }
// //     ],

// //     totalPrice: {
// //       type: Number,
// //       required: true
// //     },

// //     status: {
// //       type: String,
// //       enum: ["pending", "paid", "shipped", "delivered"],
// //       default: "pending"
// //     },

// //     isPaid: {
// //       type: Boolean,
// //       default: false
// //     },

// //     paidAt: {
// //       type: Date
// //     }
// //   },
// //   { timestamps: true }
// // );

// // export default mongoose.model("Order", orderSchema);


// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     // 🔥 Frontend compatible items structure
//     items: [
//       {
//         _id: false,
//         productId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//         },
//         title: String,
//         price: Number,
//         image: String,
//         qty: {
//           type: Number,
//           default: 1,
//         },
//       },
//     ],

//     total: {
//       type: Number,
//       required: true,
//     },

//     address: {
//       name: String,
//       mobile: String,
//       address: String,
//       city: String,
//       pincode: String,
//     },

//     paymentMethod: {
//       type: String,
//       enum: ["COD", "UPI", "CARD"],
//       default: "COD",
//     },

//     status: {
//       type: String,
//       enum: ["Placed", "Cancelled", "Shipped", "Delivered"],
//       default: "Placed",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Order", orderSchema);

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Items
    items: [
      {
        _id: false,
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        title: String,
        price: Number,
        image: String,
        qty: {
          type: Number,
          default: 1,
        },
      },
    ],

    total: {
      type: Number,
      required: true,
    },

    address: {
      name: String,
      mobile: String,
      address: String,
      city: String,
      pincode: String,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "UPI", "CARD"],
      default: "COD",
    },

    status: {
      type: String,
      enum: ["Placed", "Cancelled", "Shipped", "Delivered"],
      default: "Placed",
    },

    // ✅ NEW FIELDS (required for ecommerce cancel flow)
    cancelRequested: {
      type: Boolean,
      default: false,
    },

    cancelReason: {
      type: String,
      default: "",
    },

  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
