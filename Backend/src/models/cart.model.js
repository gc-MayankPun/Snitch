import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "products",
      required: true,
    },
  },
  { timestamps: true },
);

const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;
