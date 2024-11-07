const jwt = require("jsonwebtoken");
const { config } = require("../config/index");

class Jwt {
  #accessToken;
  #refreshToken;
  #resetPasswordToken
  constructor(accessToken, refreshToken, resetPasswordToken) {
    this.#accessToken = accessToken;
    this.#refreshToken = refreshToken;
    this.#resetPasswordToken = resetPasswordToken;
  }

  generate(userId) {
    return jwt.sign(
      { id: userId, exp: Math.floor(Date.now() / 1000) + 60 * 10 },
      this.#accessToken
    );
  }

  verify(token) {
    return jwt.verify(token, this.#accessToken);
  }

  generateRefresh(userId) {
    return jwt.sign(
      { id: userId, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      this.#refreshToken
    );
  }

  verifyRefresh(token) {
    return jwt.verify(token, this.#refreshToken);
  }
  generateResetPassword(userId){
      return jwt.sign(
      { id: userId, exp: Math.floor(Date.now() / 1000) + 60 * 5 },
      this.#resetPasswordToken
    );
  }
  verifyResetPassword(token){
    return jwt.verify(token, this.#resetPasswordToken)
  }
  
}

const myJwt = new Jwt(config.jwtKey, config.refreshKey, config.resetPasswordKey);

module.exports = { myJwt };
