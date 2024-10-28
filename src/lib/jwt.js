const jwt = require("jsonwebtoken");
const { config } = require("../config/index");

class Jwt {
  #secret;
  constructor(secret) {
    this.#secret = secret;
  }

  generate(userId) {
    return jwt.sign(
      { id: userId, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      this.#secret
    );
  }

  verify(token) {
    return jwt.verify(token, this.#secret);
  }
}

const myJwt = new Jwt(config.jwtKey);

module.exports = { myJwt };
