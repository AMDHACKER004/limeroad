import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true
    },

    discount: {
      type: Number,
      default: 0
    },

    brand: {
      type: String,
      default: "LimeRoad"
    },

    image: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true,
      uppercase: true
    },

    description: {
      type: String,
      default: ""
    },

    // ✅ NEW FIELDS (SIZE & COLOR)
    sizes: {
      type: [String],
      default: []   // example: ["S", "M", "L", "XL"]
    },

    colors: {
      type: [String],
      default: []   // example: ["Red", "Black", "Blue"]
    },

    stock: {
      type: Number,
      default: 10
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
