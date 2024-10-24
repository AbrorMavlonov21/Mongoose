const { required } = require("joi");
const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
    name:{ type: String, required: true}
});

const CategoryModel = mongoose.model("Categories", categorySchema, "Categories");

module.exports = { CategoryModel }