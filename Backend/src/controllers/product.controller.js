import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export async function createProduct(req, res) {
  const { title, description, priceAmount, priceCurrency } = req.body;
  const seller = req.user;

  const images = await Promise.all(
    req.files.map(async (file) => {
      return await uploadFile({
        buffer: file.buffer,
        fileName: file.originalname,
      });
    }),
  );

  const product = await productModel.create({
    title,
    description,
    seller: seller._id,
    price: {
      amount: priceAmount,
      currency: priceCurrency || "INR",
    },
    images,
  });

  res
    .status(201)
    .json({ message: "Product created successfully", success: true, product });
}

export async function getSellerProduct(req, res) {
  const seller = req.user;

  const products = await productModel.find({ seller: seller._id });
  res.status(200).json({
    message: "Products fetched successfully",
    success: true,
    products,
  });
}

export async function getAllproducts(req, res) {
  const products = await productModel.find();

  return res.status(200).json({
    message: "Product fetched successfully",
    success: true,
    products,
  });
}

export async function getSingleProduct(req, res) {
  const { productId } = req.params;
  const product = await productModel.findById(productId);

  return res.status(200).json({
    message: "Product fetched successfully",
    success: true,
    product,
  });
}

export async function addProductToCart(req, res) {
  const cart = await cartModel.create({
    user: req.user._id,
    product: req.params.productId,
  });

  return res
    .status(200)
    .json({ message: "Item added to the cart", success: true, cart });
}
