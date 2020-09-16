const Sequelize = require("sequelize");

const database = new Sequelize("bd_Rentacar", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

//mapear la base de datos
database.sync({ alter: true }).then(() => {
  console.log("tablas sincronizadas");
});

module.exports = { database, Sequelize };
