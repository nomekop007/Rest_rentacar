const Sequelize = require("sequelize");

const database = new Sequelize("bd_Rentacar", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = { database, Sequelize };
