const { ref, required } = require("joi");
const mongoose = require("mongoose");

const korzinkaSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    totalPrice:{
        type: Number,
        required: true
    }
})

const KorzinkaModel = mongoose.model("Karzinka", korzinkaSchema, "Karzinka");

module.exports = { KorzinkaModel }