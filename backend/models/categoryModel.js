const mongoose = require("mongoose");

const categoryModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Category", categoryModel);
