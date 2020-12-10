const Sequelize = require("sequelize");

let name = process.env.DB_NAME;
if (process.env.NODE_ENV == "testing") {
    name = process.env.DB_TEST_NAME;
}


const database = new Sequelize(
    name,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DIALECT,
    logging: false,
}
);

if (process.env.DB_MAP === "TRUE") {
    //mapear la base de datos
    database.sync({ alter: true }).then(() => {
        console.log("tablas sincronizadas");
    });
}

module.exports = { database, Sequelize };