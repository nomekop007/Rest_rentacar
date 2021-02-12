const { asClass, createContainer, asFunction, asValue } = require("awilix");

let container = createContainer();

const config = require('../envirements');
const StartUp = require('../../startup');
const Server = require('../../server');
const Route = require("../../routes/route");
const { db } = require("../database/db");



container.register({
    db: asValue(db),
    config: asValue(config),
    router: asFunction(Route).singleton(),
    app: asClass(StartUp).singleton(),
    server: asClass(Server).singleton(),
})

container = require('./other.injection')(container);
container = require('./middlewares.injection')(container);
container = require('./helpers.injection')(container);
container = require('./abonos/abono.injection')(container);
container = require('./accesorios/accesorio.injection')(container);
container = require('./actaEntregas/actaEntregas.injection')(container);
container = require('./arriendos/arriendos.injection')(container);
container = require('./clientes/clientes.injection')(container);
container = require('./conductores/conductores.injection')(container);
container = require('./contactos/contactos.inejction')(container);
container = require('./contratos/contratos.injection')(container);
container = require('./danioVehiculos/danioVehiculos.injection')(container);
container = require('./despachos/despachos.injection')(container);
container = require('./empresaRemplazos/empresaRemplazos.injection')(container);
container = require('./empresas/empresas.injection')(container);
container = require('./extenciones/extenciones.injection')(container);
container = require('./facturaciones/facturaciones.injection')(container);
container = require('./garantias/garantias.injection')(container);
container = require('./pagoAccesorios/pagoAccesorios.injection')(container);
container = require('./pagoArriendos/pagoArriendos.injection')(container);
container = require('./pagoDanios/pagoDanios.injection')(container);
container = require('./pagos/pagos.injection')(container);
container = require('./propietarios/propietarios.injection')(container);
container = require('./regiones/regiones.injection')(container);
container = require('./remplazos/remplazo.injection')(container);
container = require('./requisitos/requistos.injection')(container);
container = require('./reservas/reserva.injection')(container);
container = require('./roles/roles.injection')(container);
container = require('./sucursales/sucursales.injection')(container);
container = require('./tarifaVehiculos/tarifaVehiculos.injection')(container);
container = require('./usuarios/usuarios.injection')(container);
container = require('./vehiculos/vehiculos.injection')(container);
container = require('./FotoDespacho/FotoDespacho.injection')(container);
container = require('./documentoClientes/documentoClientes.injection')(container);
container = require('./documentoConductores/documentoConductores.injection')(container);
container = require('./documentoEmpresas/documentoEmpresas.injection')(container);






module.exports = container;