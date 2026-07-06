import { Router } from "express";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import { createProduct, getAllproducts, getSellerProduct } from "../controllers/product.controller.js";
import { createProductValidator } from "../validator/product.validator.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

const router = Router();

router.post("/", authenticateSeller, upload.array("images", 7), createProductValidator, createProduct);

router.get("/seller", authenticateSeller, getSellerProduct)

router.get("/", getAllproducts)

export default router;
