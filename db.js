const { Sequelize, database } = require("./databaseConnect");

//llamar al models
const RolModel = require("./models/roles");
const UsuarioModel = require("./models/usuarios");
const SucursalModel = require("./models/sucursales");
const VehiculoModel = require("./models/vehiculos");
const AccesoriosModel = require("./models/accesorios");
const ArriendoModel = require("./models/arriendos");
const ClienteModel = require("./models/clientes");
const EmpresaModel = require("./models/empresas");
const ConductorModel = require("./models/conductores");
const DocumentoModel = require("./models/documentos");
const PagoArriendosModel = require("./models/pagosArriendos");

//conectar modelo con base de datos
const Rol = RolModel(database, Sequelize);
const Usuario = UsuarioModel(database, Sequelize);
const Sucursal = SucursalModel(database, Sequelize);
const Vehiculo = VehiculoModel(database, Sequelize);
const Arriendo = ArriendoModel(database, Sequelize);
const Accesorio = AccesoriosModel(database, Sequelize);
const Cliente = ClienteModel(database, Sequelize);
const Empresa = EmpresaModel(database, Sequelize);
const Conductor = ConductorModel(database, Sequelize);
const Documento = DocumentoModel(database, Sequelize);
const PagoArriendo = PagoArriendosModel(database, Sequelize);

//Asociaciones de tablas

// un arriendo tiene un pagoArriendo
Arriendo.hasOne(PagoArriendo, { foreignKey: { name: "id_arriendo" } });

//un pago arriendo pertenece a un arriendo
PagoArriendo.belongsTo(Arriendo, { foreignKey: { name: "id_arriendo" } });

// un Rol tiene muchos usuarios
Rol.hasMany(Usuario, { foreignKey: { name: "id_rol" } });
//un usuario pertenece a un rol
Usuario.belongsTo(Rol, { foreignKey: { name: "id_rol" } });

// una sucursal tiene muchos usuarios
Sucursal.hasMany(Usuario, { foreignKey: { name: "id_sucursal" } });
//un usuario pertenecen a una sucursal
Usuario.belongsTo(Sucursal, { foreignKey: { name: "id_sucursal" } });

//un vehiculo pertenecen a una sucursal
Vehiculo.belongsTo(Sucursal, { foreignKey: { name: "id_sucursal" } });
// una sucursal tiene muchos vehiculos
Sucursal.hasMany(Vehiculo, { foreignKey: { name: "id_sucursal" } });

//un arriendo pertenece a un Cliente
Arriendo.belongsTo(Cliente, { foreignKey: { name: "rut_cliente" } });
//un Cliente tiene muchos Arriendo
Cliente.hasMany(Arriendo, { foreignKey: { name: "rut_cliente" } });

//un arriendo pertenece a un Empresa
Arriendo.belongsTo(Empresa, { foreignKey: { name: "rut_empresa" } });
//un Empresa tiene muchos Arriendo
Empresa.hasMany(Arriendo, { foreignKey: { name: "rut_empresa" } });

//un arriendo pertenece a un Conductor
Arriendo.belongsTo(Conductor, { foreignKey: { name: "rut_conductor" } });
//un Conducto tiene muchos Arriendo
Conductor.hasMany(Arriendo, { foreignKey: { name: "rut_conductor" } });

//un arriendo pertenece a un vehiculo
Arriendo.belongsTo(Vehiculo, { foreignKey: { name: "patente_vehiculo" } });
//un vehiculo tiene muchos Arriendo
Vehiculo.hasMany(Arriendo, { foreignKey: { name: "patente_vehiculo" } });

//un arriendo pertenece a un Usuario
Arriendo.belongsTo(Usuario, { foreignKey: { name: "id_usuario" } });
//un Usuario tiene muchos Arriendo
Usuario.hasMany(Arriendo, { foreignKey: { name: "id_usuario" } });

//un arriendo pertenece a un sucursal
Arriendo.belongsTo(Sucursal, { foreignKey: { name: "id_sucursal" } });
//un Sucursal tiene muchos Arriendo
Sucursal.hasMany(Arriendo, { foreignKey: { name: "id_sucursal" } });

// un arriendo tiene muchos accesorios
Arriendo.belongsToMany(Accesorio, {
    through: "Arriendos-Accesorios",
    foreignKey: { name: "id_arriendo" },
});
// un accesorio tiene muchos arriendos
Accesorio.belongsToMany(Arriendo, {
    through: "Arriendos-Accesorios",
    foreignKey: { name: "id_accesorio" },
});

// un arriendo tiene muchos documentos
Arriendo.belongsToMany(Documento, {
    through: "Arriendos-Documentos",
    foreignKey: { name: "id_arriendo" },
});
// un documento tiene muchos arriendos
Documento.belongsToMany(Arriendo, {
    through: "Arriendos-Documentos",
    foreignKey: { name: "id_documento" },
});

module.exports = {
    Rol,
    Usuario,
    Sucursal,
    Vehiculo,
    Arriendo,
    Accesorio,
    Cliente,
    Empresa,
    Conductor,
    Documento,
    PagoArriendo,
};