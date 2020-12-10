const { Sequelize, database } = require("./databaseConnect");

//llamar al models
const LogModel = require("../models/log");
const RolModel = require("../models/roles");
const UsuarioModel = require("../models/usuarios");
const SucursalModel = require("../models/sucursales");
const VehiculoModel = require("../models/vehiculos");
const AccesoriosModel = require("../models/accesorios");
const ArriendoModel = require("../models/arriendos");
const ContactoModel = require("../models/contactos");
const ClienteModel = require("../models/clientes");
const EmpresaModel = require("../models/empresas");
const ConductorModel = require("../models/conductores");
const RequistoModel = require("../models/requisitos");
const ContratoModel = require("../models/contratos");
const PagoArriendoModel = require("../models/pagoArriendos");
const FacturacionModel = require("../models/facturaciones");
const GarantiaModel = require("../models/garantias");
const ModoPagoModel = require("../models/modosPagos");
const PropietarioModel = require("../models/propietarios");
const RemplazoModel = require("../models/remplazos");
const ActaEntregaModel = require("../models/actaEntrega");
const DespachoModel = require("../models/despacho");
const PagoAccesoriosModel = require("../models/pagoAccesorios");
const EmpresaRemplazoModel = require("../models/empresaRemplazos");
const PagoModel = require("../models/pagos");
const RegionModel = require("../models/regiones");
const DanioVehiculoModel = require("../models/danioVehiculo");
const PagoDanioModel = require("../models/pagosDanios");


//conectar modelo con base de datos
const Log = LogModel(database, Sequelize);
const Usuario = UsuarioModel(database, Sequelize);
const Rol = RolModel(database, Sequelize);
const Sucursal = SucursalModel(database, Sequelize);
const Vehiculo = VehiculoModel(database, Sequelize);
const Arriendo = ArriendoModel(database, Sequelize);
const Cliente = ClienteModel(database, Sequelize);
const Accesorio = AccesoriosModel(database, Sequelize);
const Empresa = EmpresaModel(database, Sequelize);
const Conductor = ConductorModel(database, Sequelize);
const Requisito = RequistoModel(database, Sequelize);
const Contrato = ContratoModel(database, Sequelize);
const PagoArriendo = PagoArriendoModel(database, Sequelize);
const Facturacion = FacturacionModel(database, Sequelize);
const Garantia = GarantiaModel(database, Sequelize);
const ModoPago = ModoPagoModel(database, Sequelize);
const Propietario = PropietarioModel(database, Sequelize);
const Remplazo = RemplazoModel(database, Sequelize);
const ActaEntrega = ActaEntregaModel(database, Sequelize);
const Despacho = DespachoModel(database, Sequelize);
const PagoAccesorio = PagoAccesoriosModel(database, Sequelize);
const Pago = PagoModel(database, Sequelize);
const EmpresaRemplazo = EmpresaRemplazoModel(database, Sequelize);
const Contacto = ContactoModel(database, Sequelize);
const Region = RegionModel(database, Sequelize);
const DanioVehiculo = DanioVehiculoModel(database, Sequelize);
const PagoDanio = PagoDanioModel(database, Sequelize);


//opciones
//RESTRICT, CASCADE, NO ACTION, SET DEFAULTy SET NULL.
const onDelete = "CASCADE";
const onUpdate = "CASCADE";

//Asociaciones de tablas


// un pagoArriendo tiene muchos pagoAccesorio
PagoArriendo.hasMany(PagoAccesorio, { foreignKey: { name: "id_pagoArriendo" }, onDelete: onDelete, onUpdate: onUpdate });
//un pagoAccesorio pertenece a un pagoArriendo
PagoAccesorio.belongsTo(PagoArriendo, { foreignKey: { name: "id_pagoArriendo" }, onDelete: onDelete, onUpdate: onUpdate });

// un accesorio tiene muchos pagosAccesorios
Accesorio.hasMany(PagoAccesorio, { foreignKey: { name: "id_accesorio" }, onDelete: onDelete, onUpdate: onUpdate });
// un pagoAccesorios pertenece a un accesorio
PagoAccesorio.belongsTo(Accesorio, { foreignKey: { name: "id_accesorio" }, onDelete: onDelete, onUpdate: onUpdate });

// un arriento tiene una despacho
Arriendo.hasOne(Despacho, { foreignKey: { name: "id_arriendo" }, onDelete: onDelete, onUpdate: onUpdate });
//un despacho pertenece a un arriendo
Despacho.belongsTo(Arriendo, { foreignKey: { name: "id_arriendo" }, onDelete: onDelete, onUpdate: onUpdate });

// un despacho tiene una actaEntrega
Despacho.hasOne(ActaEntrega, { foreignKey: { name: "id_despacho" }, onDelete: onDelete, onUpdate: onUpdate });
//un actaEntrega pertenece a un despacho
ActaEntrega.belongsTo(Despacho, { foreignKey: { name: "id_despacho" }, onDelete: onDelete, onUpdate: onUpdate });

// un Propietario tiene muchos vehiculos
Propietario.hasMany(Vehiculo, { foreignKey: { name: "rut_propietario" }, onDelete: onDelete, onUpdate: onUpdate });
// un vehiculos pertenece a un Propietario
Vehiculo.belongsTo(Propietario, { foreignKey: { name: "rut_propietario" }, onDelete: onDelete, onUpdate: onUpdate });

// un arriento tiene una garantia
Arriendo.hasOne(Garantia, { foreignKey: { name: "id_arriendo" }, onDelete: onDelete, onUpdate: onUpdate });
//un garantia pertenece a un arriendo
Garantia.belongsTo(Arriendo, { foreignKey: { name: "id_arriendo" }, onDelete: onDelete, onUpdate: onUpdate });

// un arriento tiene una contacto
Arriendo.hasOne(Contacto, { foreignKey: { name: "id_arriendo" }, onDelete: onDelete, onUpdate: onUpdate });
//un Contacto pertenece a un arriendo
Contacto.belongsTo(Arriendo, { foreignKey: { name: "id_arriendo" }, onDelete: onDelete, onUpdate: onUpdate });

// un modoPago tiene muchos facturacion
ModoPago.hasMany(Facturacion, { foreignKey: { name: "id_modoPago" }, onDelete: onDelete, onUpdate: onUpdate });
// un Facturacion pertenece a un modoPago
Facturacion.belongsTo(ModoPago, { foreignKey: { name: "id_modoPago" }, onDelete: onDelete, onUpdate: onUpdate });

// un modoPago tiene muchos garantias
ModoPago.hasMany(Garantia, { foreignKey: { name: "id_modoPago" }, onDelete: onDelete, onUpdate: onUpdate });
// un garantia pertenece a un modoPago
Garantia.belongsTo(ModoPago, { foreignKey: { name: "id_modoPago" }, onDelete: onDelete, onUpdate: onUpdate });

//un facturacion tiene muchos pago
Facturacion.hasMany(Pago, { foreignKey: { name: "id_facturacion" }, onDelete: onDelete, onUpdate: onUpdate });
//un pago  pertenece a un facturacion
Pago.belongsTo(Facturacion, { foreignKey: { name: "id_facturacion" }, onDelete: onDelete, onUpdate: onUpdate });


//un facturacion tiene muchos pagoDanio
Facturacion.hasMany(PagoDanio, { foreignKey: { name: "id_facturacion" }, onDelete: onDelete, onUpdate: onUpdate })
//un pago  pertenece a un facturacion
PagoDanio.belongsTo(Facturacion, { foreignKey: { name: "id_facturacion" }, onDelete: onDelete, onUpdate: onUpdate });


//un pagoArrriendo tiene muchos pago
PagoArriendo.hasMany(Pago, { foreignKey: { name: "id_pagoArriendo" }, onDelete: onDelete, onUpdate: onUpdate });
//un pago  pertenece a un PagoArriendo
Pago.belongsTo(PagoArriendo, { foreignKey: { name: "id_pagoArriendo" }, onDelete: onDelete, onUpdate: onUpdate });


// un arriendo tiene muchos pagos
Arriendo.hasMany(PagoArriendo, { foreignKey: { name: "id_arriendo" }, onDelete: onDelete, onUpdate: onUpdate });
//un pago arriendo pertenece a un arriendo
PagoArriendo.belongsTo(Arriendo, { foreignKey: { name: "id_arriendo" }, onDelete: onDelete, onUpdate: onUpdate });

// un Rol tiene muchos usuarios
Rol.hasMany(Usuario, { foreignKey: { name: "id_rol" }, onDelete: onDelete, onUpdate: onUpdate });
//un usuario pertenece a un rol
Usuario.belongsTo(Rol, { foreignKey: { name: "id_rol" }, onDelete: onDelete, onUpdate: onUpdate });

// una sucursal tiene muchos usuarios
Sucursal.hasMany(Usuario, { foreignKey: { name: "id_sucursal" }, onDelete: onDelete, onUpdate: onUpdate });
//un usuario pertenecen a una sucursal
Usuario.belongsTo(Sucursal, { foreignKey: { name: "id_sucursal" }, onDelete: onDelete, onUpdate: onUpdate });

// una region tiene muchos vehiculos
Region.hasMany(Vehiculo, { foreignKey: { name: "id_region" }, onDelete: onDelete, onUpdate: onUpdate });
//un vehiculo pertenecen a una region
Vehiculo.belongsTo(Region, { foreignKey: { name: "id_region" }, onDelete: onDelete, onUpdate: onUpdate });

// un region tiene muchas Sucursales
Region.hasMany(Sucursal, { foreignKey: { name: "id_region" }, onDelete: onDelete, onUpdate: onUpdate });
// una sucursal pertenece a una region
Sucursal.belongsTo(Region, { foreignKey: { name: "id_region" }, onDelete: onDelete, onUpdate: onUpdate });

//un arriendo pertenece a un Cliente
Arriendo.belongsTo(Cliente, { foreignKey: { name: "rut_cliente" }, onDelete: onDelete, onUpdate: onUpdate });
//un Cliente tiene muchos Arriendo
Cliente.hasMany(Arriendo, { foreignKey: { name: "rut_cliente" }, onDelete: onDelete, onUpdate: onUpdate });

//un arriendo pertenece a un Remplazo
Arriendo.belongsTo(Remplazo, { foreignKey: { name: "id_remplazo" }, onDelete: onDelete, onUpdate: onUpdate });
//un Remplazo tiene un Arriendo
Remplazo.hasOne(Arriendo, { foreignKey: { name: "id_remplazo" }, onDelete: onDelete, onUpdate: onUpdate });

//un remplazo pertenece a un cliente
Remplazo.belongsTo(Cliente, { foreignKey: { name: "rut_cliente" }, onDelete: onDelete, onUpdate: onUpdate });
//un cliente tiene muchos remplazo
Cliente.hasMany(Remplazo, { foreignKey: { name: "rut_cliente" }, onDelete: onDelete, onUpdate: onUpdate });

//un remplazo pertenece a un empresaRemplazo
Remplazo.belongsTo(EmpresaRemplazo, { foreignKey: { name: "codigo_empresaRemplazo" }, onDelete: onDelete, onUpdate: onUpdate });
//un EmpresaRempalzo tiene muchos remplazo
EmpresaRemplazo.hasMany(Remplazo, { foreignKey: { name: "codigo_empresaRemplazo" }, onDelete: onDelete, onUpdate: onUpdate });

//un arriendo pertenece a un Empresa
Arriendo.belongsTo(Empresa, { foreignKey: { name: "rut_empresa" }, onDelete: onDelete, onUpdate: onUpdate });
//un Empresa tiene muchos Arriendo
Empresa.hasMany(Arriendo, { foreignKey: { name: "rut_empresa" }, onDelete: onDelete, onUpdate: onUpdate });

//un arriendo pertenece a un vehiculo
Arriendo.belongsTo(Vehiculo, { foreignKey: { name: "patente_vehiculo" }, onDelete: onDelete, onUpdate: onUpdate });
//un vehiculo tiene muchos Arriendo
Vehiculo.hasMany(Arriendo, { foreignKey: { name: "patente_vehiculo" }, onDelete: onDelete, onUpdate: onUpdate });

//un arriendo pertenece a un Usuario
Arriendo.belongsTo(Usuario, { foreignKey: { name: "id_usuario" }, onDelete: onDelete, onUpdate: onUpdate });
//un Usuario tiene muchos Arriendo
Usuario.hasMany(Arriendo, { foreignKey: { name: "id_usuario" }, onDelete: onDelete, onUpdate: onUpdate });

//un arriendo pertenece a un sucursal
Arriendo.belongsTo(Sucursal, { foreignKey: { name: "id_sucursal" }, onDelete: onDelete, onUpdate: onUpdate });
//un Sucursal tiene muchos Arriendo
Sucursal.hasMany(Arriendo, { foreignKey: { name: "id_sucursal" }, onDelete: onDelete, onUpdate: onUpdate });

// un arriendo tiene un requisto
Arriendo.hasOne(Requisito, { foreignKey: { name: "id_arriendo" }, onDelete: onDelete, onUpdate: onUpdate });
//un requisito  pertenece a un arriendo
Requisito.belongsTo(Arriendo, { foreignKey: { name: "id_arriendo" }, onDelete: onDelete, onUpdate: onUpdate });

//un Contrato pertenece a un Arriendo
Contrato.belongsTo(Arriendo, { foreignKey: { name: "id_arriendo" }, onDelete: onDelete, onUpdate: onUpdate });
//un Arriendo tiene muchos Contrato
Arriendo.hasMany(Contrato, { foreignKey: { name: "id_arriendo" }, onDelete: onDelete, onUpdate: onUpdate });

//un Contrato pertenece a un Pago
Contrato.belongsTo(PagoArriendo, { foreignKey: { name: "id_pagoArriendo" }, onDelete: onDelete, onUpdate: onUpdate });
//un pago tiene un Contrato
PagoArriendo.hasOne(Contrato, { foreignKey: { name: "id_pagoArriendo" }, onDelete: onDelete, onUpdate: onUpdate });


//un arriendo pertenece  un Conductor
Arriendo.belongsTo(Conductor, { foreignKey: { name: "rut_conductor" }, onDelete: onDelete, onUpdate: onUpdate });

//un Conducto tiene muchos Arriendo
Conductor.hasMany(Arriendo, { foreignKey: { name: "rut_conductor" }, onDelete: onDelete, onUpdate: onUpdate });


// un danioVehiculo pertenece a un arriendo
DanioVehiculo.belongsTo(Arriendo, { foreignKey: { name: "id_arriendo" }, onDelete: onDelete, onUpdate: onUpdate });
// un arriendo tiene muchos danioVehiculo
Arriendo.hasMany(DanioVehiculo, { foreignKey: { name: "id_arriendo" }, onDelete: onDelete, onUpdate: onUpdate })


// un danioVehiculo pertenece a un Vehiculo
DanioVehiculo.belongsTo(Vehiculo, { foreignKey: { name: "patente_vehiculo" }, onDelete: onDelete, onUpdate: onUpdate });
// un Vehiculo tiene muchos danioVehiculo
Vehiculo.hasMany(DanioVehiculo, { foreignKey: { name: "patente_vehiculo" }, onDelete: onDelete, onUpdate: onUpdate })


// un PagoDanio pertenece a un danioVehiculo
PagoDanio.belongsTo(DanioVehiculo, { foreignKey: { name: "id_danioVehiculo" }, onDelete: onDelete, onUpdate: onUpdate });
// un danioVehiculo tiene un PagoDanio
DanioVehiculo.hasOne(PagoDanio, { foreignKey: { name: "id_danioVehiculo" }, onDelete: onDelete, onUpdate: onUpdate })




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
    PagoArriendo,
    Facturacion,
    ModoPago,
    Garantia,
    Propietario,
    Remplazo,
    Despacho,
    ActaEntrega,
    PagoAccesorio,
    EmpresaRemplazo,
    Pago,
    Contacto,
    Region,
    PagoDanio,
    DanioVehiculo
};