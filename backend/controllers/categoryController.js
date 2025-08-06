const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");

exports.getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "Categories fetched successfully",
      categories,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: err.message,
      message: "Error fetching categories",
    });
  }
};

exports.getCategoryById = async (req, res) => {
  const id = req.params.id;

  try {
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category fetched successfully",
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: err.message,
      message: "Error fetching category by ID",
    });
  }
};

exports.createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(401).send({
      message: "Category name is required",
    });
  }

  try {
    if (await categoryModel.findOne({ slug: slugify(name) })) {
      return res.json({
        success: false,
        message: "Category already exists",
      });
    }
    const newCategory = new categoryModel({ name, slug: slugify(name) });
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: err.message,
      message: "Error creating category",
    });
  }
};

exports.updateCategory = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  if (!name) {
    res.status(401).send({
      message: "Category name is required",
    });
  }

  try {
    const newCategory = await categoryModel.findOneAndUpdate(
      { _id: id },
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );

    if (!newCategory) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category: newCategory,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: err.message,
      message: "Error updating category",
    });
  }
};

exports.deleteCategory = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedCategory = await categoryModel.findOneAndDelete({ _id: id });
    if (!deletedCategory) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
      category: deletedCategory,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: err.message,
      message: "Error deleting category",
    });
  }
};
