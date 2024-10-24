const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    login: {
    type: String,
    required: true,
    unique: true,
    trim: true // Removes whitespace from beginning and end
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
    trim: true
  }
});
const UserModel = mongoose.model("Users", userSchema, "Users");

module.exports = { UserModel };