const Sequelize = require("sequelize");

const { DB } = require('../envirements')

const config = DB;

const database = new Sequelize(config.database, config.username, config.password, config)

if (process.env.DB_MAP === "TRUE") {
    //mapear la base de datos
    database.sync({ alter: true }).then(() => {
        console.log("tablas sincronizadas");
    });
}

module.exports = { database, Sequelize };


