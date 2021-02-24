const { asClass, createContainer, asFunction, asValue } = require("awilix");

let container = createContainer();

const config = require('../envirements');
const StartUp = require('../../api/startup');
const Server = require('../../api/server');
const Route = require("../../api/routes/route");
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

container = require('./contexts/accesorio.injection')(container);
container = require('./contexts/arriendos.injection')(container);
container = require('./contexts/clientes.injection')(container);
container = require('./contexts/despachos.injection')(container);
container = require('./contexts/empresaRemplazos.injection')(container);
container = require('./contexts/logs.injection')(container);
container = require('./contexts/pagos.injection')(container);
container = require('./contexts/permisos.injection')(container);
container = require('./contexts/propietarios.injection')(container);
container = require('./contexts/regiones.injection')(container);
container = require('./contexts/reserva.injection')(container);
container = require('./contexts/roles.injection')(container);
container = require('./contexts/sucursales.injection')(container);
container = require('./contexts/usuarios.injection')(container);
container = require('./contexts/vehiculos.injection')(container);

module.exports = container;