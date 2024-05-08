const env = require("dotenv").config().parsed;
const rateLimit = require("express-rate-limit");
// let moment = require("moment-timezone");
// moment = moment.tz.setDefault(env.TIMEZONE)
// moment = moment().format('YYYY-MM-DD HH:mm:ss');

var moment = require('moment-timezone');
moment().tz(env.TIMEZONE).format();


const limiter = rateLimit({
  max: 20, // batas maksimum jumlah request
  windowMs: 15 * 60 * 1000, // waktu dalam milidetik
  message: { error: "Too many requests, please try again later." },
});

// Database
const database_config = {
  development: {
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    host: env.DB_HOST,
    dialect: env.DB_CONNECTION,
  },
  test: {
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    host: env.DB_HOST,
    dialect: env.DB_CONNECTION,
  },
  production: {
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    host: env.DB_HOST,
    dialect: env.DB_CONNECTION,
  },
};
// Database

const config = {
  database: database_config,
};

module.exports = {
  config: env.parsed,
  rateLimit: limiter,
  config: config,
  // moment 
  moment: moment,
};
