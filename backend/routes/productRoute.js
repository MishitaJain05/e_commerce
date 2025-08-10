const express = require("express");
const productController = require("../controllers/productController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const formidable = require("express-formidable");

const productRouter = express.Router();

//routes
productRouter.post(
  "/create-product",
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

productRouter.get("/get-products", productController.getProducts);

productRouter.get("/get-product/:slug", productController.getSingleProduct);

productRouter.get("/product-photo/:pid", productController.getPhoto);

productRouter.delete("/delete-product/:pid", productController.deleteProduct);

productRouter.post("/product-filters", productController.getProductFilters);

productRouter.get("/product-count", productController.getProductCount);

productRouter.get("/product-list/:page", productController.getProductList);

module.exports = productRouter;
