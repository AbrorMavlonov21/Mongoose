const mongoose = require("mongoose");

const korzinkaProductSchema = new mongoose.Schema({
    KorzinkaID: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Karzinka',
    required: true
  },
  ProductID: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Products',
    required: true
  },
  count: {
    type: Number,
    required: true
  },
    totalPrice:{
        type: Number,
        required: true
    }
});
const korzinkaProductModel = mongoose.model("Korzinka-Products", korzinkaProductSchema, "Korzinka-Products");

module.exports = { korzinkaProductModel}
