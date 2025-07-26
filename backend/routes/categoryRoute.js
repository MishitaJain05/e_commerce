const express = require("express");
const categoryController = require("../controllers/categoryController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const categoryRouter = express.Router();

categoryRouter.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  categoryController.createCategory
);

categoryRouter.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  categoryController.updateCategory
);

categoryRouter.get("/get-categories", categoryController.getCategories);

categoryRouter.get(
  "/single-category/:slug",
  categoryController.getCategoryById
);

categoryRouter.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  categoryController.deleteCategory
);

module.exports = categoryRouter;
