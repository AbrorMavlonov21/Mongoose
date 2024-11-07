const { CustomError } = require("../../lib/customError");
const { userService } = require("../../modules/user/user.service");
const { myHashing } = require("../../lib/bcrypt");
const { authService } = require("../auth/auth.service");
const { authSchema } = require("../dto/auth.dto");
const { validater } = require("../../lib/validater");
const { userSchema } = require("../dto/user.dto");
const { myJwt } = require("../../lib/jwt");
const { forgotPasswordSchema, verifyCodeSchema, changePasswordSchema } = require("../dto/forgotPassword.dto");
const { config }= require("../../config/index");
const { VerificationCode } = require("../../lib/verificationCode");
const { transporter } = require("../../lib/nodemailer");
const { ResData } = require("../../lib/resData");


class AuthController {
    #authService;
    #userService;
    #jwt;
    #hashing;
    constructor(authService, userService, jwt, hashing) {

        this.#authService = authService;
        this.#userService = userService;
        this.#jwt = jwt;
        this.#hashing = hashing;
    }
    async login(req, res, next){
        try { 

       const dto = req.body;
        validater(authSchema, dto);

        const { data: foundUserByLogin } = await this.#userService.getByLogin(
        dto.login
      );

      if (!foundUserByLogin) {
        throw new CustomError(400, "login or password wrong!");
      }

      const isValidate = await this.#hashing.isValidate(
        dto.password,
        foundUserByLogin.password
      );

      if (!isValidate) {
        throw new CustomError(400, "login or password wrong!");
      }

      const resData = this.#authService.generateToken(foundUserByLogin);

      res.status(resData.status).json(resData);

            
        } catch (error) {
            next(error);
            
        }
    }
    async register(req, res, next){
        try {
            const dto = req.body;
            dto.role = "client";
            validater(userSchema, dto);

       const foundUserByLogin = await this.#userService.getByLogin(
        dto.login
      );

      if (foundUserByLogin.data) {
        throw new CustomError(400, "login already exist");
      }
       


        const resData = await this.#userService.createUser(dto);

        res.status(resData.status).json(resData);

        } catch (error) {
            next(error);
            
        }
    }
    async refTokenCheck(req, res, next){
      try {
        
        const token = req.headers.authorization;
        if (!token) {
          throw new CustomError(401, "authorization is required");
        }
        const [type, tokenValue] = token.split(' ');
        if (type !== "Bearer" || !tokenValue) {
          throw new CustomError(401, "Authorization header with Bearer token is required");
        }
        const { id } = await this.#jwt.verifyRefresh(tokenValue);

        const { data } = await this.#userService.getById(id);

        const resData =  this.#authService.generateToken(data);

        res.status(resData.status).json(resData);

      } catch (error) {
        next(error);
      }

    }
    async resetPassword(req, res, next){
      try {
        const dto = req.body;
        
        validater(forgotPasswordSchema, dto);

        const { data: foundUserByLogin } = await this.#userService.getByLogin(
        dto.gmail
      );

      if (!foundUserByLogin) {
        throw new CustomError(400, "User not found");
      }
      const code = VerificationCode();

      const myMail = {
      from: config.gmail,
      to: dto.gmail, 
      subject: " Password reset code",
      text: `Your verification code is: ${code}`
    }

    await transporter.sendMail(myMail);

    foundUserByLogin.code = code;
    
    const { data: updatedUserData } = await this.#userService.updateUser(foundUserByLogin._id, foundUserByLogin);

    const resData = await this.#authService.resetPasswordToken(updatedUserData);

    res.status(resData.status).json(resData)
        
      } catch (error) {
        next(error);
      }
    }
    async verifyPassword(req, res, next){
      try {
        const dto = req.body;
        validater(verifyCodeSchema, dto);

        const currentUser = req.currentUser;

        if (!currentUser.code) {
          throw new CustomError(400, "Pls send confirmation code");
        }
        if(currentUser.count >= 3){
          currentUser.count = 0;
          currentUser.code = null;
          currentUser.isVerified = false;
          await this.#userService.updateUser(currentUser._id, currentUser);

          throw new CustomError(400, "you have tried 3 times");
        }
        if(dto.code === currentUser.code){
          currentUser.count = 0;
          currentUser.code = null;
          currentUser.isVerified = true;
          await this.#userService.updateUser(currentUser._id, currentUser);

          const resData = this.#authService.resetPasswordToken(currentUser);

          return res.status(resData.status).json(resData);

        } else {

          currentUser.count = currentUser.count + 1;
          currentUser.isVerified = false;
          await this.#userService.updateUser(currentUser._id, currentUser);

          const resData = new ResData(400, "Wrong code try again");

          res.status(resData.status).json(resData);
        }


      } catch (error) {
        next(error);
      }
    }
    async changePassword(req, res, next){
      try {
        const dto = req.body;

        validater(changePasswordSchema, dto);

        const currentUser = req.currentUser

        if(!currentUser.isVerified){
          throw new CustomError(400, "Your code is not verfied");
        }
        const hashPassword = await this.#hashing.hash(dto.newPassword);

        currentUser.password = hashPassword;
        currentUser.isVerified = false;

        await this.#userService.updateUser(currentUser._id, currentUser);

        const resData = new ResData(200, "Your password was successfully changed!!!");

        res.status(resData.status).json(resData);
      } catch (error) {
        next(error);
      }
    }
}

const authController = new AuthController(authService, userService, myJwt, myHashing);

module.exports = { authController };