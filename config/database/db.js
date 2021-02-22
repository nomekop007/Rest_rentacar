const Sequelize = require("sequelize");
const { DB } = require('../envirements')
const config = DB;
const db = {}

const database = new Sequelize(config.database, config.username, config.password, config);

//conectar modelo con base de datos
const Usuario = require("../../contexts/usuarios/dataAccess/usuario.entity")(database, Sequelize);
const Vehiculo = require("../../contexts/vehiculos/dataAccess/vehiculo.entity")(database, Sequelize);
const PagoHistorial = require("../../contexts/pagos/dataAccess/pagoHistorial.entity")(database, Sequelize);
const PagoArriendo = require("../../contexts/pagos/dataAccess/pagoArriendo.entity")(database, Sequelize);
const ModoPago = require("../../contexts/pagos/dataAccess/modoPago.entity")(database, Sequelize);
const PagoAccesorio = require("../../contexts/pagos/dataAccess/pagoAccesorio.entity")(database, Sequelize);
const Pago = require("../../contexts/pagos/dataAccess/pago.entity")(database, Sequelize);
const PagoDanio = require("../../contexts/pagos/dataAccess/pagoDanio.entity")(database, Sequelize);
const Abono = require("../../contexts/pagos/dataAccess/abono.entity")(database, Sequelize);


const Log = require("../../models/log")(database, Sequelize);
const LogError = require("../../models/logErrors")(database, Sequelize);
const Rol = require("../../models/roles")(database, Sequelize);
const Sucursal = require("../../models/sucursales")(database, Sequelize);
const Arriendo = require("../../models/arriendos")(database, Sequelize);
const Cliente = require("../../models/clientes")(database, Sequelize);
const Accesorio = require("../../models/accesorios")(database, Sequelize);
const Empresa = require("../../models/empresas")(database, Sequelize);
const Conductor = require("../../models/conductores")(database, Sequelize);
const Requisito = require("../../models/requisitos")(database, Sequelize);
const Contrato = require("../../models/contratos")(database, Sequelize);
const Facturacion = require("../../models/facturaciones")(database, Sequelize);
const Garantia = require("../../models/garantias")(database, Sequelize);
const Propietario = require("../../models/propietarios")(database, Sequelize);
const Remplazo = require("../../models/remplazos")(database, Sequelize);
const ActaEntrega = require("../../models/actaEntrega")(database, Sequelize);
const Despacho = require("../../models/despacho")(database, Sequelize);
const EmpresaRemplazo = require("../../models/empresaRemplazos")(database, Sequelize);
const Contacto = require("../../models/contactos")(database, Sequelize);
const Region = require("../../models/regiones")(database, Sequelize);
const DanioVehiculo = require("../../models/danioVehiculo")(database, Sequelize);
const DocumentoCliente = require("../../models/documentosClientes")(database, Sequelize);
const DocumentoEmpresa = require("../../models/documentosEmpresas")(database, Sequelize);
const DocumentoConductor = require("../../models/documentosConductores")(database, Sequelize);
const TarifaVehiculo = require("../../models/tarifasVehiculos")(database, Sequelize);
const Reserva = require("../../models/reservas")(database, Sequelize);
const ReservaCliente = require("../../models/reservasClientes")(database, Sequelize);
const ReservaEmpresa = require("../../models/reservasEmpresas")(database, Sequelize);
const FotoDespacho = require("../../models/fotosDespachos")(database, Sequelize);
const Permiso = require("../../models/permisos")(database, Sequelize);
const RolPermiso = require("../../models/rolesPermisos")(database, Sequelize);
const Extencion = require("../../models/extenciones")(database, Sequelize);




//opciones
//RESTRICT, CASCADE, NO ACTION, SET DEFAULT y SET NULL.
const onDelete = "CASCADE";
const onUpdate = "CASCADE";

//Asociaciones de tablas

// un pago tiene muchos pagoHistorial
Pago.hasMany(PagoHistorial, { foreignKey: { name: "id_pago" }, onDelete: onDelete, onUpdate: onUpdate });
// un pagoHistorial pertenece a un pago
PagoHistorial.belongsTo(Pago, { foreignKey: { name: "id_pago" }, onDelete: onDelete, onUpdate: onUpdate });

//un arriendo tiene muchas extenciones
Arriendo.hasMany(Extencion, { foreignKey: { name: "id_arriendo" }, onDelete: onDelete, onUpdate: onUpdate });
//una extencion pertenece a un arriendo
Extencion.belongsTo(Arriendo, { foreignKey: { name: "id_arriendo" }, onDelete: onDelete, onUpdate: onUpdate });

// un contrato tiene una extencion
Contrato.hasOne(Extencion, { foreignKey: { name: "id_contrato" }, onDelete: onDelete, onUpdate: onUpdate });
// una extencion tiene un contrato
Extencion.belongsTo(Contrato, { foreignKey: { name: "id_contrato" }, onDelete: onDelete, onUpdate: onUpdate });

//un pagoArriendo tiene una extencion
PagoArriendo.hasOne(Extencion, { foreignKey: { name: "id_pagoArriendo" }, onDelete: onDelete, onUpdate: onUpdate });
// una extencion pertenece a un pagoArriendo
Extencion.belongsTo(PagoArriendo, { foreignKey: { name: "id_pagoArriendo" }, onDelete: onDelete, onUpdate: onUpdate });

// un vehiculo tiene muchas extenciones
Vehiculo.hasMany(Extencion, { foreignKey: { name: "patente_vehiculo" }, onDelete: onDelete, onUpdate: onUpdate });
//una extencion pertenece a un vehiculos
Extencion.belongsTo(Vehiculo, { foreignKey: { name: "patente_vehiculo" }, onDelete: onDelete, onUpdate: onUpdate });


// un pago tiene muchos abonos
Pago.hasMany(Abono, { foreignKey: { name: "id_pago" }, onDelete: onDelete, onUpdate: onUpdate });
// un abono pertenece a un pago
Abono.belongsTo(Pago, { foreignKey: { name: "id_pago" }, onDelete: onDelete, onUpdate: onUpdate });


//un facturacion tiene muchos Abono
Facturacion.hasMany(Abono, { foreignKey: { name: "id_facturacion" }, onDelete: onDelete, onUpdate: onUpdate });
//un Abono  pertenece a un facturacion
Abono.belongsTo(Facturacion, { foreignKey: { name: "id_facturacion" }, onDelete: onDelete, onUpdate: onUpdate });


// un rol tiene muchos RolPermiso 
Rol.hasMany(RolPermiso, { foreignKey: { name: "id_rol" }, onDelete: onDelete, onUpdate: onUpdate });
// un RolPermiso pertenece a un roles
RolPermiso.belongsTo(Rol, { foreignKey: { name: "id_rol" }, onDelete: onDelete, onUpdate: onUpdate });

// un permiso tiene muchos rolesPermisos
Permiso.hasMany(RolPermiso, { foreignKey: { name: "id_permiso" }, onDelete: onDelete, onUpdate: onUpdate });
// un RolPermiso pertenece a un permiso
RolPermiso.belongsTo(Permiso, { foreignKey: { name: "id_permiso" }, onDelete: onDelete, onUpdate: onUpdate });

//un arriendo tiene muchas fotos de despacho
Arriendo.hasMany(FotoDespacho, { foreignKey: { name: "id_arriendo" }, onDelete: onDelete, onUpdate: onUpdate });

//una foto de despacho pertenece a un arriendo
FotoDespacho.belongsTo(Arriendo, { foreignKey: { name: "id_arriendo" }, onDelete: onDelete, onUpdate: onUpdate })

//un Reserva tiene un ReservaCliente 
Reserva.hasOne(ReservaCliente, { foreignKey: { name: "id_reserva" }, onDelete: onDelete, onUpdate: onUpdate });
//un ReservaCliente pertenece a un Reserva
ReservaCliente.belongsTo(Reserva, { foreignKey: { name: "id_reserva" }, onDelete: onDelete, onUpdate: onUpdate });

//una sucuersal tiene muchas reservas
Sucursal.hasMany(Reserva, { foreignKey: { name: "id_sucursal" }, onDelete: onDelete, onUpdate: onUpdate });
//un Reserva pertenece a un Sucursal
Reserva.belongsTo(Sucursal, { foreignKey: { name: "id_sucursal" }, onDelete: onDelete, onUpdate: onUpdate });

//un Reserva tiene un ReservaEmpresa
Reserva.hasOne(ReservaEmpresa, { foreignKey: { name: "id_reserva" }, onDelete: onDelete, onUpdate: onUpdate });
//un ReservaEmpresa pertenece a un Reserva
ReservaEmpresa.belongsTo(Reserva, { foreignKey: { name: "id_reserva" }, onDelete: onDelete, onUpdate: onUpdate });

// un cliente tiene muchas reservasClientes
Cliente.hasMany(ReservaCliente, { foreignKey: { name: "rut_cliente" }, onDelete: onDelete, onUpdate: onUpdate });
// una reservaClietne pertenece a un Cliente
ReservaCliente.belongsTo(Cliente, { foreignKey: { name: "rut_cliente" }, onDelete: onDelete, onUpdate: onUpdate });

// una empresa tiene muchas reservasEmpresas
Empresa.hasMany(ReservaEmpresa, { foreignKey: { name: "rut_empresa" }, onDelete: onDelete, onUpdate: onUpdate });
//una reservaEmpresa pertenece una Empresa
ReservaEmpresa.belongsTo(Empresa, { foreignKey: { name: "rut_empresa" }, onDelete: onDelete, onUpdate: onUpdate })


// un vehiculo tiene muchas reservas
Vehiculo.hasMany(Reserva, { foreignKey: { name: "patente_vehiculo" }, onDelete: onDelete, onUpdate: onUpdate });
// una reserva pertenece a un vehiculo
Reserva.belongsTo(Vehiculo, { foreignKey: { name: "patente_vehiculo" }, onDelete: onDelete, onUpdate: onUpdate });


// un usuario tiene muchos log
Usuario.hasMany(Log, { foreignKey: { name: "id_usuario" }, onDelete: onDelete, onUpdate: onUpdate });
//un log pertenece a un usuario
Log.belongsTo(Usuario, { foreignKey: { name: "id_usuario" }, onDelete: onDelete, onUpdate: onUpdate });


// un pagoArriendo tiene muchos pagoAccesorio
PagoArriendo.hasMany(PagoAccesorio, { foreignKey: { name: "id_pagoArriendo" }, onDelete: onDelete, onUpdate: onUpdate });
//un pagoAccesorio pertenece a un pagoArriendo
PagoAccesorio.belongsTo(PagoArriendo, { foreignKey: { name: "id_pagoArriendo" }, onDelete: onDelete, onUpdate: onUpdate });

// un accesorio tiene muchos pagosAccesorios
Accesorio.hasMany(PagoAccesorio, { foreignKey: { name: "id_accesorio" }, onDelete: onDelete, onUpdate: onUpdate });
// un pagoAccesorios pertenece a un accesorio
PagoAccesorio.belongsTo(Accesorio, { foreignKey: { name: "id_accesorio" }, onDelete: onDelete, onUpdate: onUpdate });


// un vehiculo tiene un tarifaVehiculoModel
Vehiculo.hasOne(TarifaVehiculo, { foreignKey: { name: "patente_vehiculo" }, onDelete: onDelete, onUpdate: onUpdate });
// una tarifaVehiculo pertenece a un vehiculo
TarifaVehiculo.belongsTo(Vehiculo, { foreignKey: { name: "patente_vehiculo" }, onDelete: onDelete, onUpdate: onUpdate });

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


// una sucursal tiene muchos Accesorios
Sucursal.hasMany(Accesorio, { foreignKey: { name: "id_sucursal" }, onDelete: onDelete, onUpdate: onUpdate });
//un Accesorio pertenecen a una sucursal
Accesorio.belongsTo(Sucursal, { foreignKey: { name: "id_sucursal" }, onDelete: onDelete, onUpdate: onUpdate });



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

// un cliente tiene un documentoCliente
Cliente.hasOne(DocumentoCliente, { foreignKey: { name: "rut_cliente" }, onDelete: onDelete, onUpdate: onUpdate });
// un documentoCliente pertenece a un cliente
DocumentoCliente.belongsTo(Cliente, { foreignKey: { name: "rut_cliente" }, onDelete: onDelete, onUpdate: onUpdate });

// un empresa tiene un documentoEmpresa
Empresa.hasOne(DocumentoEmpresa, { foreignKey: { name: "rut_empresa" }, onDelete: onDelete, onUpdate: onUpdate });
// un documentoEmpresa pertenece a un empresa
DocumentoEmpresa.belongsTo(Empresa, { foreignKey: { name: "rut_empresa" }, onDelete: onDelete, onUpdate: onUpdate });

// un Conductor tiene un documentoConductor
Conductor.hasOne(DocumentoConductor, { foreignKey: { name: "rut_conductor" }, onDelete: onDelete, onUpdate: onUpdate });
// un documentoConductor pertenece a un Conductor
DocumentoConductor.belongsTo(Conductor, { foreignKey: { name: "rut_conductor" }, onDelete: onDelete, onUpdate: onUpdate });





db.log = Log;
db.logErro = LogError;
db.usuario = Usuario;
db.rol = Rol;
db.sucursal = Sucursal;
db.vehiculo = Vehiculo;
db.arriendo = Arriendo;
db.cliente = Cliente;
db.accesorio = Accesorio;
db.empresa = Empresa;
db.conductor = Conductor;
db.requisito = Requisito;
db.contrato = Contrato;
db.pagoArriendo = PagoArriendo;
db.facturacion = Facturacion;
db.garantia = Garantia;
db.modoPago = ModoPago;
db.propietario = Propietario;
db.remplazo = Remplazo;
db.actaEntrega = ActaEntrega;
db.despacho = Despacho;
db.pagoAccesorio = PagoAccesorio;
db.pago = Pago;
db.empresaRemplazo = EmpresaRemplazo;
db.contacto = Contacto;
db.region = Region;
db.danioVehiculo = DanioVehiculo;
db.pagoDanio = PagoDanio;
db.documentoCliente = DocumentoCliente;
db.documentoEmpresa = DocumentoEmpresa;
db.documentoConductor = DocumentoConductor;
db.tarifaVehiculo = TarifaVehiculo;
db.reserva = Reserva;
db.reservaCliente = ReservaCliente;
db.reservaEmpresa = ReservaEmpresa;
db.fotoDespacho = FotoDespacho;
db.permiso = Permiso;
db.rolPermiso = RolPermiso;
db.abono = Abono;
db.extencion = Extencion;
db.pagoHistorial = PagoHistorial;



db.sequelize = database;
db.Sequelize = Sequelize;



module.exports = {
    db,
    Log,
    LogError,
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
    DanioVehiculo,
    DocumentoCliente,
    DocumentoEmpresa,
    DocumentoConductor,
    TarifaVehiculo,
    Reserva,
    ReservaCliente,
    ReservaEmpresa,
    FotoDespacho,
    RolPermiso,
    Rol,
    Permiso,
    Abono,
    Extencion,
    PagoHistorial
};