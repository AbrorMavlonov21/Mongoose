const express = require("express");
const cors = require("cors");
const { config } = require("./config/index");
const { router } = require("./modules/module.routes");
const { CustomError } = require("./lib/customError");
const { ResData } = require("./lib/resData");
const mongoose = require("mongoose")

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.use((req, res, next) => {
  try {
    const url = req.url;
    const method = req.method;
    const status = 404;

    throw new CustomError(status, `url ${url} and method ${method} not found`);
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";

  const resData = new ResData(status, message);

  res.status(resData.status).json(resData);
});

mongoose.connect("mongodb://localhost:27017/MyMarket").then(()=>{
    console.log("connected to MongoDB");
    
}).catch((err) =>{
    throw err;
});

app.listen(config.serverPort, () => {
  console.log("http://localhost:" + config.serverPort);
});
