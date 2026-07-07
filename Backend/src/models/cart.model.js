import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "product",
      required: true,
    },
  },
  { timestamps: true },
);

const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;
