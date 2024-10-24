const { CustomError } = require("../../lib/customError");
const { validater } = require("../../lib/validater");
const { userService } = require("./user.service");
const { userSchema } = require("../dto/user.dto");
const { default: mongoose, model } = require("mongoose");

class UserController {
    #userService;
    constructor(userService) {
        this.#userService = userService;
    }
    async getAll(req, res, next){
        try {
            const resData = await this.#userService.getAll();

            res.status(resData.status).json(resData);
        } catch (error) {
            next(error);
            
        }
    }
    async createUser(req, res, next){
        try {
            const dto = req.body;
            validater(userSchema, dto);

            const resData = await this.#userService.createUser(dto);

            res.status(resData.status).json(resData);

        } catch (error) {
            next(error);
        }
    }
    async updateUser(req, res, next){
        try {
            const userId = req.params.id;
            const idIsValid = mongoose.Types.ObjectId.isValid(userId);

            if (!idIsValid) {
                throw new CustomError(400, "Invalid ID");
            }
            const dto =req.body;
            validater(userSchema, dto);
            const resData = await this.#userService.updateUser(userId,dto,{new:true});
            res.status(resData.status).json(resData);
        } catch (error) {
            next(error);
        }
    }
    async deleteUser(req, res, next){
        try {
            const userId = req.params.id;
            const idIsValid = mongoose.Types.ObjectId.isValid(userId);
            if (!idIsValid) {
                throw new CustomError(400, "Invalid ID");
            }

            const resData = await this.#userService.deleteUser(userId);
            res.status(resData.status).json(resData);
            
        } catch (error) {
            next(error)
        }
    }
}

const userController = new UserController(userService);
module.exports = { userController }