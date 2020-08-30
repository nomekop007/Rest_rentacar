const { Sequelize, database } = require("./databaseConnect");

//llamar al models
const UsuarioModel = require("./models/usuarios");
const SucursalModel = require("./models/sucursales");
const VehiculoModel = require("./models/vehiculos");

//conectar modelo con base de datos
const Usuario = UsuarioModel(database, Sequelize);
const Sucursal = SucursalModel(database, Sequelize);
const Vehiculo = VehiculoModel(database, Sequelize);

//mapear la base de datos
database.sync({ force: false }).then(() => {
  console.log("tablas sincronizadas");
});

module.exports = {
  Usuario,
  Sucursal,
  Vehiculo,
};
