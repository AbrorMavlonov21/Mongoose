const { ResData } = require("../../lib/resData");
const { UserModel } =require("../schemas/user.schema");
const { authService } = require("../auth/auth.service");
const { CustomError } = require("../../lib/customError");


class UserService {
    #model;
    #authService;
    constructor(model, authService) {
        this.#model = model;
        this.#authService = authService;
    }

    async getAll(){
        const resData = await this.#model.find();
        return new ResData(200, "success", resData);
    }

    async createUser(dto){
    if (dto.password) {
    const { data: hashedPassword } = await this.#authService.register(dto.password);
    dto.password = hashedPassword;
    }

    let createdData = await this.#model.create(dto);

    const resData = new ResData(201, "Created", createdData);
    return resData;
    }
    async updateUser(id, dto){
        let updatedData = await this.#model.findByIdAndUpdate(id, dto, {new: true});

        const resData = new ResData(200, "Updated", updatedData);
        return resData;
    }
    async deleteUser(id){
        await this.#model.findOneAndDelete(id);

        const resData = new ResData(200, "Deleted");
        
        return resData;
    }
    async getByLogin(login) {
    const data = await this.#model.findOne({ login });

    const resData = new ResData(200, "success", data);

    if (!data) {
      resData.status = 404;
      resData.message = "User not found";
    }

    return resData;
  }
  async getById(id){
    const data = await this.#model.findById(id);

        if (!data) {
      throw new CustomError(404, "User not found by id!");
    }

    const resData = new ResData(200, "success", data);
    return resData;

  }
}

const userService = new UserService(UserModel, authService)

module.exports = { userService }