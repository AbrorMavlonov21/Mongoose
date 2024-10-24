const { ResData } = require("../../lib/resData");
const { ProductModel } =require("../schemas/product.schema");

class ProductService {
    #model;
    constructor(model) {
        this.#model = model;
    }

    async getAll(){
        const resData = await this.#model.find().populate("categoryID");
        return new ResData(200, "success", resData);
    }

    async createProduct(dto){
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

const productService = new ProductService(ProductModel)

module.exports = { productService }