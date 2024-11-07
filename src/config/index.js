require("dotenv").config();

const config = {
  serverPort: Number(process.env.PORT),
  jwtKey: process.env.JWT_KEY,
  refreshKey: process.env.REFRESH_KEY,
  gmail: process.env.GMAIL,
  gmail_Password: process.env.GMAIL_PASSWORD,
  resetPasswordKey: process.env.RESET_PASSWORD_KEY
};

module.exports = { config };
