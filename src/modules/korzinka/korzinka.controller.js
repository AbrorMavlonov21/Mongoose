const { default: mongoose } = require("mongoose");
const { korzinkaService } = require("./korzinka.service");
const { CustomError } = require("../../lib/customError");
const { validater } = require("../../lib/validater");
const { korzinkaSchema } = require("../dto/korzinka.dto");
const { userService } = require("../user/user.service");
const bcrypt = require('bcrypt');

class KorzinkaController {
    #korzinkaService;
    #userService;
    constructor(korzinkaService, userService) {
        this.#korzinkaService = korzinkaService;
        this.#userService = userService;
        
    }
    async getAll(req, res, next){
        try {

            const resData = await this.#korzinkaService.getAll();

            res.status(resData.status).json(resData);
            
        } catch (error) {
            next(error);
        }
    }
    async createKorzinka(req, res, next){
        try {

            const dto = req.body;
            validater(korzinkaSchema, dto);

            const idIsValid = mongoose.Types.ObjectId.isValid(dto.userID);
            if (!idIsValid) {
                throw new CustomError(400, "Invalid User ID format");
            }
            const {data: foundUserByID} = await this.#userService.getById(dto.userID);

            dto.userID = foundUserByID._id;


            const resData = await this.#korzinkaService.create({ userID: dto.userID, totalPrice: dto.totalPrice });

            res.status(resData.status).json(resData);

            
        } catch (error) {
            next(error);
        }
    }
    async updateKorzinka(req , res, next){
        try {
             const korzinkaId = req.params.id;
            const korzinkaiIdIsValid = mongoose.Types.ObjectId.isValid(korzinkaId);

            if (!korzinkaiIdIsValid) {
                throw new CustomError(400, "Invalid ID");
            }
            const dto =req.body;
            validater(korzinkaSchema, dto);

            const idIsValid = mongoose.Types.ObjectId.isValid(dto.userID);
            if (!idIsValid) {
                throw new CustomError(400, "Invalid User ID format");
            }
            const {data: foundUserByID} = await this.#userService.getById(dto.userID);

            dto.userID = foundUserByID._id;
            const resData = await this.#korzinkaService.update(korzinkaId,{ userID: dto.userID, totalPrice: dto.totalPrice });
            res.status(resData.status).json(resData);
        } catch (error) {
            next(error);
        }
    }
    async deleteKorzinka(req, res, next){
        try {
        const korzinkaId = req.params.id;
        const korzinkaiIdIsValid = mongoose.Types.ObjectId.isValid(korzinkaId);
        if (!korzinkaiIdIsValid) {
            throw new CustomError(400, "Invalid ID");
        }
        const resData = await this.#korzinkaService.delete(korzinkaId);
        res.status(resData.status).json(resData);
        } catch (error) {
            next(error);
        }
    }

}
const korzinkaController = new KorzinkaController(korzinkaService, userService);
module.exports = { korzinkaController }