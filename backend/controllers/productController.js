const slugify = require("slugify");
const fs = require("fs");
const productModel = require("../models/productModel");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;

    if (!name || !description || !price || !category || !quantity) {
      return res.status(400).send({ message: "All fields are required" });
    }

    if (!photo || photo.size > 1000000) {
      return res
        .status(400)
        .send({ message: "Photo is required and should be less than 1MB" });
    }

    const new_product = new productModel({
      ...req.fields,
      slug: slugify(name),
    });
    new_product.photo.data = fs.readFileSync(photo.path);
    new_product.photo.contentType = photo.type;

    await new_product.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product: new_product,
    });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updated_fields = req.fields;
    const { photo } = req.files;
    const pid = req.params.pid;

    const updated_product = await productModel.findByIdAndUpdate(
      pid,
      updated_fields,
      { new: true }
    );

    if (!updated_product) {
      return res.status(404).send({ message: "Product not found" });
    }

    if (photo) {
      if (photo.size > 1000000) {
        return res
          .status(400)
          .send({ message: "Photo should be less than 1MB" });
      }
      updated_product.photo.data = fs.readFileSync(photo.path);
      updated_product.photo.contentType = photo.type;
    }

    await updated_product.save();
    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product: updated_product,
    });
  } catch (err) {
    console.log("Error updating product:", err);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const pid = req.params.id;
    const product = await productModel.findByIdAndDelete(pid).select("-photo");

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Product deleted successfully",
      });
    }
  } catch (err) {
    console.log("Error deleting product:", err);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      count: products.length,
      message: "All products fetched successfully",
      products,
    });
  } catch (err) {
    console.log("Error fetching products:", err);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send({
      success: true,
      product,
    });
  } catch (err) {
    console.log("Error fetching single product:", err);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.getPhoto = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");

    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (err) {
    console.log("Error fetching product photo:", err);
    res.status(500).send({ message: "Internal server error" });
  }
};
