const { ResData } = require("../../lib/resData");
const { UserModel } =require("../schemas/user.schema");

class UserService {
    #model;
    constructor(model) {
        this.#model = model;
    }

    async getAll(){
        const resData = await this.#model.find();
        return new ResData(200, "success", resData);
    }

    async createUser(dto){
        let createdData = await this.#model.create(dto);

        const resData = new ResData(201, "Created", createdData);
        return resData;
    }
    async updateUser(id, dto){
        let updatedData = await this.#model.findByIdAndUpdate(id, dto);

        const resData = new ResData(200, "Updated", updatedData);
        return resData;
    }
    async deleteUser(id){
        await this.#model.findOneAndDelete(id);

        const resData = new ResData(200, "Deleted");
        
        return resData;
    }
}

const userService = new UserService(UserModel)

module.exports = { userService }