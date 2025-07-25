const express = require("express");
const productController = require("../controllers/productController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const formidable = require("express-formidable");

const productRouter = express.Router();

//routes
productRouter.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  productController.createProduct
);
//routes
productRouter.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  productController.updateProduct
);

productRouter.get("/get-product", productController.getProducts);

productRouter.get("/get-product/:slug", productController.getSingleProduct);

productRouter.get("/product-photo/:pid", productController.getPhoto);

productRouter.delete("/product/:pid", productController.deleteProduct);

module.exports = productRouter;
