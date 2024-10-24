const { CustomError } = require("../../lib/customError");
const { validater } = require("../../lib/validater");
const { productService } = require("./product.service");
const { productSchema } = require("../dto/product.dto");
const mongoose = require("mongoose");

class ProductController {
    #productService;
    constructor(productService) {
        this.#productService = productService;
    }

    async getAll(req, res, next) {
        try {
            const resData = await this.#productService.getAll();
            res.status(resData.status).json(resData);
        } catch (error) {
            next(error);
        }
    }

    async createProduct(req, res, next) {
        try {
            const dto = req.body;
            validater(productSchema, dto);
            const resData = await this.#productService.createProduct(dto);
            res.status(resData.status).json(resData);
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req, res, next) {
        try {
            const productId = req.params.id;
            const idIsValid = mongoose.Types.ObjectId.isValid(productId);

            if (!idIsValid) {
                throw new CustomError(400, "Invalid ID");
            }

            const dto = req.body;
            validater(productSchema, dto);
            const resData = await this.#productService.updateProduct(productId, dto); 
            res.status(resData.status).json(resData);
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const productId = req.params.id; 
            const idIsValid = mongoose.Types.ObjectId.isValid(productId);

            if (!idIsValid) {
                throw new CustomError(400, "Invalid ID");
            }

            const resData = await this.#productService.deleteProduct(productId);
            res.status(resData.status).json(resData);
        } catch (error) {
            next(error);
        }
    }
}

const productController = new ProductController(productService); 
module.exports = { productController };
