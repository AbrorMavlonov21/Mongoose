const { ResData } = require("../../lib/resData");
const { KorzinkaModel } = require("../schemas/korzinka.schema");

class KorzinkaService {
    #model;
    constructor(model) {
        this.#model = model;
    }
    async getAll(){
        const resData = await this.#model.find().populate("userID");
        
        return new ResData(200, "Success", resData);

    }
    async create(dto){
        let createdData = await this.#model.create(dto);

        const resData = new ResData(201, "Created", createdData);
        
        return resData;

    }
    async update(id,dto){
        let updatedData = await this.#model.findByIdAndUpdate(id,dto);

        const resData = new ResData(200, "Updated", updatedData);
        
        return resData;

    }
    async delete(id){
        await this.#model.findOneAndDelete(id);

        const resData = new ResData(200, "Deleted");
        
        return resData;
        
    }

}

const korzinkaService = new KorzinkaService(KorzinkaModel);

module.exports = { korzinkaService }

