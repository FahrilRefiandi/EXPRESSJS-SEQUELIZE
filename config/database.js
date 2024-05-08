const Sequelize = require("sequelize");
const env = require('dotenv').config().parsed

const sequelize = new Sequelize(
  env.DB_DATABASE,
  env.DB_USERNAME,
  env.DB_PASSWORD,
  {
    host: env.DB_HOST,
    dialect: env.DB_CONNECTION,
  }
);

sequelize.authenticate().then(() => {}).catch((error) => {
      return error
  });


module.exports = sequelize;