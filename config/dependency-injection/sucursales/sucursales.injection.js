const { asClass, asFunction } = require('awilix');

const SucursalRoutes = require('../../../api/routes/apis/sucursales.routes');
const SucursalController = require('../../../api/controllers/sucursal.controller');
const SucursalService = require('../../../contexts/sucursales/dataAccess/sucursal.repository')

module.exports = (container) => {
    container.register({
        SucursalRoutes: asFunction(SucursalRoutes).singleton(),
        SucursalController: asClass(SucursalController).singleton(),
        SucursalService: asClass(SucursalService).singleton()
    })
    return container;
}



