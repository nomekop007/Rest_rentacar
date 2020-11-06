const { Sequelize, database } = require("./databaseConnect");

//llamar al models
const LogModel = require("../models/log");
const RolModel = require("../models/roles");
const UsuarioModel = require("../models/usuarios");
const SucursalModel = require("../models/sucursales");
const VehiculoModel = require("../models/vehiculos");
const AccesoriosModel = require("../models/accesorios");
const ArriendoModel = require("../models/arriendos");
const ClienteModel = require("../models/clientes");
const EmpresaModel = require("../models/empresas");
const ConductorModel = require("../models/conductores");
const RequistoModel = require("../models/requisitos");
const ContratoModel = require("../models/contratos");
const PagoModel = require("../models/pagos");
const FacturacionModel = require("../models/facturaciones");
const GarantiaModel = require("../models/garantias");
const ModoPagoModel = require("../models/modosPagos");
const PropietarioModel = require("../models/propietarios");
const RemplazoModel = require("../models/remplazos");
const ActaEntregaModel = require("../models/actaEntrega");
const DespachoModel = require("../models/despacho");
const PagoAccesoriosModel = require("../models/pagoAccesorios");

//conectar modelo con base de datos
const Log = LogModel(database, Sequelize);
const Rol = RolModel(database, Sequelize);
const Usuario = UsuarioModel(database, Sequelize);
const Sucursal = SucursalModel(database, Sequelize);
const Vehiculo = VehiculoModel(database, Sequelize);
const Arriendo = ArriendoModel(database, Sequelize);
const Accesorio = AccesoriosModel(database, Sequelize);
const Cliente = ClienteModel(database, Sequelize);
const Empresa = EmpresaModel(database, Sequelize);
const Conductor = ConductorModel(database, Sequelize);
const Requisito = RequistoModel(database, Sequelize);
const Contrato = ContratoModel(database, Sequelize);
const Pago = PagoModel(database, Sequelize);
const Facturacion = FacturacionModel(database, Sequelize);
const Garantia = GarantiaModel(database, Sequelize);
const ModoPago = ModoPagoModel(database, Sequelize);
const Propietario = PropietarioModel(database, Sequelize);
const Remplazo = RemplazoModel(database, Sequelize);
const ActaEntrega = ActaEntregaModel(database, Sequelize);
const Despacho = DespachoModel(database, Sequelize);
const PagoAccesorio = PagoAccesoriosModel(database, Sequelize);

//Asociaciones de tablas

// un pago tiene una pagoAccesorio
Pago.hasMany(PagoAccesorio, { foreignKey: { name: "id_pago" } });
//un pagoAccesorio pertenece a un pago
PagoAccesorio.belongsTo(Pago, { foreignKey: { name: "id_pago" } });

// un arriento tiene una despacho
Arriendo.hasOne(Despacho, { foreignKey: { name: "id_arriendo" } });
//un despacho pertenece a un arriendo
Despacho.belongsTo(Arriendo, { foreignKey: { name: "id_arriendo" } });

// un despacho tiene una fotoDespacho
Despacho.hasOne(ActaEntrega, { foreignKey: { name: "id_despacho" } });
//un fotoDespacho pertenece a un despacho
ActaEntrega.belongsTo(Despacho, { foreignKey: { name: "id_despacho" } });

// un Propietario tiene muchos vehiculos
Propietario.hasMany(Vehiculo, { foreignKey: { name: "rut_propietario" } });
// un vehiculos pertenece a un Propietario
Vehiculo.belongsTo(Propietario, { foreignKey: { name: "rut_propietario" } });

// un arriento tiene una garantia
Arriendo.hasOne(Garantia, { foreignKey: { name: "id_arriendo" } });
//un garantia pertenece a un arriendo
Garantia.belongsTo(Arriendo, { foreignKey: { name: "id_arriendo" } });

// un modoPago tiene muchos pagos
ModoPago.hasMany(Pago, { foreignKey: { name: "id_modoPago" } });
// un Pago pertenece a un modoPago
Pago.belongsTo(ModoPago, { foreignKey: { name: "id_modoPago" } });

// un modoPago tiene muchos garantias
ModoPago.hasMany(Garantia, { foreignKey: { name: "id_modoPago" } });
// un garantia pertenece a un modoPago
Garantia.belongsTo(ModoPago, { foreignKey: { name: "id_modoPago" } });

//un facturacion tiene muchos pago
Facturacion.hasMany(Pago, { foreignKey: { name: "id_facturacion" } });
//un pago  pertenece a un facturacion
Pago.belongsTo(Facturacion, { foreignKey: { name: "id_facturacion" } });

// un arriendo tiene muchos pagos
Arriendo.hasMany(Pago, { foreignKey: { name: "id_arriendo" } });
//un pago arriendo pertenece a un arriendo
Pago.belongsTo(Arriendo, { foreignKey: { name: "id_arriendo" } });

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

//un arriendo pertenece a un Remplazo
Arriendo.belongsTo(Remplazo, { foreignKey: { name: "id_remplazo" } });
//un Remplazo tiene un Arriendo
Remplazo.hasOne(Arriendo, { foreignKey: { name: "id_remplazo" } });

//un remplazo pertenece a un cliente
Remplazo.belongsTo(Cliente, { foreignKey: { name: "rut_cliente" } });
//un cliente tiene muchos remplazo
Cliente.hasMany(Remplazo, { foreignKey: { name: "rut_cliente" } });

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

// un arriendo tiene un requisto
Arriendo.hasOne(Requisito, { foreignKey: { name: "id_arriendo" } });
//un requisito  pertenece a un arriendo
Requisito.belongsTo(Arriendo, { foreignKey: { name: "id_arriendo" } });

//un Contrato pertenece a un Arriendo
Contrato.belongsTo(Arriendo, { foreignKey: { name: "id_arriendo" } });
//un Arriendo tiene muchos Contrato
Arriendo.hasMany(Contrato, { foreignKey: { name: "id_arriendo" } });

//un Contrato pertenece a un Pago
Contrato.belongsTo(Pago, { foreignKey: { name: "id_pago" } });
//un pago tiene un Contrato
Pago.hasOne(Contrato, { foreignKey: { name: "id_pago" } });

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

module.exports = {
    Log,
    Rol,
    Usuario,
    Sucursal,
    Vehiculo,
    Arriendo,
    Accesorio,
    Cliente,
    Empresa,
    Conductor,
    Contrato,
    Requisito,
    Pago,
    Facturacion,
    ModoPago,
    Garantia,
    Propietario,
    Remplazo,
    Despacho,
    ActaEntrega,
    PagoAccesorio,
};