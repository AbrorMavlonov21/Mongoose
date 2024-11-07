const express = require("express");
const cors = require("cors");
const { config } = require("./config/index");
const { router } = require("./modules/module.routes");
const { CustomError } = require("./lib/customError");
const { ResData } = require("./lib/resData");
const mongoose = require("mongoose");
const { transporter } = require("./lib/nodemailer");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.post("/send-email", async(req, res, next)=>{
  const { to, subject, text } = req.body;
  try {
    const myMail = {
      from: config.gmail,
      to,
      subject,
      text
    }

    const data = await transporter.sendMail(myMail);
    const resData = new ResData(200, "Email sent", data);
    res.status(resData.status).json(resData)
  } catch (error) {
    next(error);
  }
})

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
