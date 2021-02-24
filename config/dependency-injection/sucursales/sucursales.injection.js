const { asClass, asFunction } = require('awilix');

const SucursalRoutes = require('../../../api/routes/apis/sucursales.routes');
const SucursalController = require('../../../api/controllers/sucursal.controller');
const SucursalRepository = require('../../../contexts/sucursales/dataAccess/sucursal.repository')

module.exports = (container) => {
    container.register({
        SucursalRoutes: asFunction(SucursalRoutes).singleton(),
        SucursalController: asClass(SucursalController).singleton(),
        SucursalRepository: asClass(SucursalRepository).singleton()
    })
    return container;
}



