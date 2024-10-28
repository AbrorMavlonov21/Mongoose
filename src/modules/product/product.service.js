const { ResData } = require("../../lib/resData");
const { ProductModel } =require("../schemas/product.schema");
const { categoryService } = require("../category/category.service")

class ProductService {
    #model;
    #categoryService
    constructor(model) {
        this.#model = model;
        this.#categoryService = categoryService;
    }

    async getAll(){
        const resData = await this.#model.find().populate("categoryID");
        return new ResData(200, "success", resData);
    }

    async createProduct(dto){
        const { categoryID } = dto;
        
        await this.#categoryService.getById(categoryID);

        let createdData = await this.#model.create(dto);

        const resData = new ResData(201, "Created", createdData);
        return resData;
    }
    async updateProduct(id, dto){
        let updatedData = await this.#model.findByIdAndUpdate(id, dto);

        const resData = new ResData(200, "Updated", updatedData);
        return resData;
    }
    async deleteProduct(id){
        await this.#model.findOneAndDelete(id);

        const resData = new ResData(200, "Deleted");
        
        return resData;
    }
}

const productService = new ProductService(ProductModel, categoryService)

module.exports = { productService }