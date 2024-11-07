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
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  isVerified: { type: Boolean, default: false },
  count: {type: Number, default: 0},
  code: {type: String, default: null, require: false },

});
const UserModel = mongoose.model("Users", userSchema, "Users");

module.exports = { UserModel };