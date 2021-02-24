const { asClass, asFunction } = require('awilix');

const SucursalRoutes = require('../../../api/routes/apis/sucursales.routes');
const SucursalController = require('../../../api/controllers/sucursal.controller');
const SucursalService = require('../../../contexts/sucursales/services/sucursal.service');
const SucursalBusiness = require('../../../contexts/sucursales/domain/sucursal.business');
const SucursalRepository = require('../../../contexts/sucursales/dataAccess/sucursal.repository')

module.exports = (container) => {
    container.register({
        SucursalRoutes: asFunction(SucursalRoutes).singleton(),
        SucursalController: asClass(SucursalController).singleton(),
        SucursalService: asClass(SucursalService).singleton(),
        SucursalBusiness: asClass(SucursalBusiness).singleton(),
        SucursalRepository: asClass(SucursalRepository).singleton()
    })
    return container;
}



