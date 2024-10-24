const { Router } = require("express");
const { categoryController } = require("./category.controller");

const router = Router();

router.get("/", categoryController.getAll.bind(categoryController));
router.post("/create", categoryController.createCategory.bind(categoryController));
router.put("/update/:id", categoryController.updateCategory.bind(categoryController));
router.delete("/delete/:id", categoryController.deleteCategory.bind(categoryController));

module.exports = { router };
