const { asClass, asFunction } = require('awilix');

const SucursalRoutes = require('../../../routes/api/sucursales.routes');
const SucursalController = require('../../../controllers/sucursal.controller');
const SucursalService = require('../../../services/sucursal.service')

module.exports = (container) => {
    container.register({
        SucursalRoutes: asFunction(SucursalRoutes).singleton(),
        SucursalController: asClass(SucursalController).singleton(),
        SucursalService: asClass(SucursalService).singleton()
    })
    return container;
}



