const { default: mongoose } = require("mongoose");
const { validater } = require("../../lib/validater");
const { CustomError } = require("../../lib/customError");
const { korzinkaService } = require("../korzinka/korzinka.service");
const { korzinkaProductService } = require("./korzinkaProduct.service");
const { productService } = require("../product/product.service");
const { korzinkaProductSchema } = require("../dto/korzinka-product.dto")



class KorzinkaProductController {
    #korzinkaProductService;
    #korzinkaService;
    #productService;
    constructor(korzinkaProductService, korzinkaService, productService) {

       this.#korzinkaProductService = korzinkaProductService;
        this.#korzinkaService = korzinkaService;
        this.#productService = productService;
    }
    async getAll(req, res, next){
        try {
            const resData = await this.#korzinkaProductService.getAll();
            
            res.status(resData.status).json(resData)
        } catch (error) {
            next(error);
        }
    }
async createKorzinkaProduct(req, res, next) {
    try {
        const { KorzinkaID, ProductID, count: countStr } = req.body;

        validater(korzinkaProductSchema, req.body);

        if (!mongoose.Types.ObjectId.isValid(KorzinkaID)) {
            throw new CustomError(400, "Invalid Korzinka ID format");
        }
        if (!mongoose.Types.ObjectId.isValid(ProductID)) {
            throw new CustomError(400, "Invalid Product ID format");
        }

        const korzinkaData = await this.#korzinkaService.getById(KorzinkaID);
        const korzinka = korzinkaData.data
                if (!korzinka) {
            throw new CustomError(404, 'Korzinka not found');
        }

        const productData = await this.#productService.getById(ProductID);
        const product = productData.data;

        if (!product) {
            throw new CustomError(404, 'Product not found');
        }

        const count = Number(countStr);
        if (isNaN(count) || count <= 0) {
            throw new CustomError(400, 'Count must be a positive number');
        }

        if (product.count < count) {
            throw new CustomError(400, 'Not enough products');
        }

        const totalPrice = product.price * count;

        const dto = { ...req.body, totalPrice };

        const resData = await this.#korzinkaProductService.create(dto);

 
        res.status(resData.status).json(resData);
    } catch (error) {
        next(error);
    }
    
}
async updateKorzinkaProduct(req, res, next){
    try {
        const korzinkaProductID = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(korzinkaProductID)) {
            throw new CustomError(400, "Invalid ID format");
        }
        const dto = req.body;

        validater(korzinkaProductSchema, req.body);

        const korzinkaData = await this.#korzinkaService.getById(dto.KorzinkaID);
        const korzinka = korzinkaData.data
                if (!korzinka) {
            throw new CustomError(404, 'Korzinka not found');
        }

        const productData = await this.#productService.getById(dto.ProductID);
        const product = productData.data;

        if (!product) {
            throw new CustomError(404, 'Product not found');
        }

        if (product.count < count) {
            throw new CustomError(400, 'Not enough products in stock');
        }

        dto.totalPrice = product.price * count;

        const resData = await this.#korzinkaProductService.update(korzinkaProductID, dto);
        res.status(resData.status).json(resData);

        
    } catch (error) {
        next(error);
    }
}
async deleteKorzinkaProduct(req, res, next){
    try {
        const korzinkaProductID = req.params.id;
        
        if (!mongoose.Types.ObjectId.isValid(korzinkaProductID)) {
            throw new CustomError(400, "Invalid ID format");
        }
        const resData = await this.#korzinkaProductService.delete(korzinkaProductID);
        
        res.status(resData.status).json(resData)

        
    } catch (error) {
        next(error);
    }
}


}
const korzinkaProductController = new KorzinkaProductController(korzinkaProductService, korzinkaService, productService);

module.exports = { korzinkaProductController }