const { ResData } = require("../../lib/resData");
const { CategoryModel } = require("../schemas/category.schema");
const { nextTick } = require("node:process");

class CategoryService {
  #model;
  constructor(model) {
    this.#model = model;
  }

  async getAll() {
    const data = await this.#model.find();

    return new ResData(200, "success", data);
  }

  async createCategory(dto){
    let createdData = await this.#model.create(dto);

    const resData = new ResData(201, "Created", createdData);
    return resData;

  }

  async updateCategory(id, dto){
    let updatedData = await this.#model.findByIdAndUpdate(id, dto);
       
    const resData = new ResData(201, "Updated", updatedData);
    return resData;
  }

  async deleteCategory(id){
    let deletedData = await this.#model.findOneAndDelete(id);

    const resData = new ResData(200, "Deleted");

    return resData;
  }
}



const categoryService = new CategoryService(CategoryModel);

module.exports = { categoryService };
