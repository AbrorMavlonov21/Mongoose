const { CustomError } = require("../../lib/customError");
const { validater } = require("../../lib/validater");
const { categoryService } = require("./category.service");
const { categorySchema } = require("../dto/category.dto");
const { default: mongoose } = require("mongoose");

class CategoryController {
  #categoryService;
  constructor(categoryService) {
    this.#categoryService = categoryService;
  }

  async getAll(req, res, next) {
    try {

      const resdata = await this.#categoryService.getAll();

      res.status(resdata.status).json(resdata);
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req, res, next){
    try {

      const dto = req.body;
      validater(categorySchema, dto);

      const resData = await this.#categoryService.createCategory(dto)
      res.status(resData.status).json(resData);

      
    } catch (error) {
      next(error);
      
    }
  }

  async updateCategory(req, res, next){
    try {
      const categoryId = req.params.id;
    const idIsValid = mongoose.Types.ObjectId.isValid(categoryId);

    if(!idIsValid){
      throw new CustomError(400, "Invalid ID");
    }

    const dto =req.body;
    validater(categorySchema, dto);
    const resData = await this.#categoryService.updateCategory(categoryId, dto, {new:true});
    res.status(resData.status).json(resData);
    } catch (error) {
      next(error)
      
    }

  }

  async deleteCategory(req, res, next){
    try {
      const categoryId =  req.params.id;
      const idIsValid = mongoose.Types.ObjectId.isValid(categoryId);

      if (!idIsValid) {
        throw new CustomError(400, "Invalid ID");
      }
      const resData = await this.#categoryService.deleteCategory(categoryId);
      res.status(resData.status).json(resData);

    } catch (error) {
      
    }
  }
}

const categoryController = new CategoryController(categoryService);

module.exports = { categoryController };
