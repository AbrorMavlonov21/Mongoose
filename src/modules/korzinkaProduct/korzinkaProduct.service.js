const { ResData } = require("../../lib/resData");
const { korzinkaProductModel } = require("../schemas/korzinka-product.schema");

class KorzinkaProductService {
    #model
    constructor(model) {

        this.#model = model;
        
    }
    async getAll(){

        const resData = await this.#model.find().populate("KorzinkaID").populate("ProductID");

        return new ResData(200, "Success", resData)
    }
    async create(dto){
        const createdData = await this.#model.create(dto);
        
        const resData = new ResData(201, "Created", createdData);

        return resData;
    
    }
    async update(id, dto){
        const updatedData = await this.#model.findByIdAndUpdate(id, dto);

        const resData = new ResData(200, "Updated", updatedData);

        return resData;
    }
    async delete(id){
        const deletedData = await this.#model.findOneAndDelete(id);
        
        const resData = new ResData(200, "Deleted");

        return resData;
    }
}
const korzinkaProductService = new KorzinkaProductService(korzinkaProductModel);

module.exports = { korzinkaProductService };