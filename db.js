const { Sequelize, database } = require("./databaseConnect");

//llamar al models
const RolModel = require("./models/roles");
const UsuarioModel = require("./models/usuarios");
const SucursalModel = require("./models/sucursales");
const VehiculoModel = require("./models/vehiculos");

/*
const AccesoriosModel = require("./models/accesorios");
const ArriendoModel = require("./models/arriendos");
const ClienteModel = require("./models/clientes");
const ConductoreModel = require("./models/conductores");
const DocumentoModel = require("./models/documentos");
const EmpresaModel = require("./models/empresas");*/

//conectar modelo con base de datos
const Rol = RolModel(database, Sequelize);
const Usuario = UsuarioModel(database, Sequelize);
const Sucursal = SucursalModel(database, Sequelize);
const Vehiculo = VehiculoModel(database, Sequelize);

//Asociaciones de tablas

// un Rol posee muchos usuarios
const value = {
    foreignKey: {
        name: "id_rol",
    },
};
Rol.hasMany(Usuario, value);
Usuario.belongsTo(Rol, value);

// una sucursal posee muchos vehiculos
const value2 = {
    foreignKey: {
        name: "id_sucursal",
    },
};
Sucursal.hasMany(Vehiculo, value2);
Vehiculo.belongsTo(Sucursal, value2);

//mapear la base de datos
database.sync({ force: false }).then(() => {
    console.log("tablas sincronizadas");
});

module.exports = {
    Rol,
    Usuario,
    Sucursal,
    Vehiculo,
};