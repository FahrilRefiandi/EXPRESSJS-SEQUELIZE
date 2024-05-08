const express = require('express')
const {rateLimit,moment} = require('./config/app')
const multer = require('multer')
const multerMiddleware = multer();
const app = express()
let env = require('dotenv').config().parsed
const ApiRoute = require("./route/api"); 


app.use(express.json()); // for parsing application/json

app.use(multerMiddleware.any()); // semua form-data akan ditangani oleh multer



app.use("/api", rateLimit, ApiRoute.router);



// dynamic port and host
app.listen(env.APP_PORT, () => {
  console.log(`App running in ${env.APP_URL}:${env.APP_PORT}`)
})
