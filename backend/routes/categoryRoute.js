const express = require("express");
const categoryControlller = require("../controllers/categoryController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const categoryRouter = express.Router();

categoryRouter.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  categoryControlller.createCategory
);

categoryRouter.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  categoryControlller.updateCategory
);

categoryRouter.get("/get-category", categoryControlller.getCategories);

categoryRouter.get(
  "/single-category/:slug",
  categoryControlller.getCategoryById
);

categoryRouter.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  categoryControlller.deleteCategory
);

module.exports = categoryRouter;
