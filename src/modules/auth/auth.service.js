const { myJwt } = require("../../lib/jwt");
const { ResData } = require("../../lib/resData");
const { myHashing } = require("../../lib/bcrypt")

class AuthService {
    #bcrypt;
    #jwt
    constructor(bcrypt, jwt){
        this.#bcrypt = bcrypt;
        this.#jwt = jwt;
    }
  generateToken(user) {
    const accessToken = this.#jwt.generate(user.id);

    const refreshToken= this.#jwt.generateRefresh(user.id);

    const data = { user, tokens: {accessToken, refreshToken} }; 

    return new ResData(200, "success", data);
  }
    resetPasswordToken(user) {
    const Token = this.#jwt.generateResetPassword(user.id);


    return new ResData(200, "success", Token);
  }

  async register(password) {
    const hashedPassword = await this.#bcrypt.hash(password);

    const resData = new ResData(200, "success", hashedPassword);

    return resData;
  }
}

const authService = new AuthService(myHashing, myJwt);

module.exports = { authService };
