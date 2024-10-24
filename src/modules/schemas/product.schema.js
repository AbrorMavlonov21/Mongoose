const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true
  },
  price: {
    type: Number, 
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Categories',
    required: true
  }
});

const ProductModel = mongoose.model("Products", productSchema, "Products");

module.exports = { ProductModel };
