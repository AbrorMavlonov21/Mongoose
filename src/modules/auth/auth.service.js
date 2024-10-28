const { myJwt } = require("../../lib/jwt");
const { ResData } = require("../../lib/resData");
const { myHashing } = require("../../lib/bcrypt")

class AuthService {
    #bcrypt;
    constructor(bcrypt){
        this.#bcrypt = bcrypt;
    }
  generateToken(user) {
    const token = myJwt.generate(user.id);

    const data = { user, token };

    return new ResData(200, "success", data);
  }

  async register(password) {
    const hashedPassword = await this.#bcrypt.hash(password);

    const resData = new ResData(200, "success", hashedPassword);

    return resData;
  }
}

const authService = new AuthService(myHashing);

module.exports = { authService };
