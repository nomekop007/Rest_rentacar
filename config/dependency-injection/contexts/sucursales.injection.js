const { asClass, asFunction } = require('awilix');

const SucursalRoutes = require('../../../api/routes/apis/sucursales.routes');
const RegionRoutes = require('../../../api/routes/apis/regiones.routes');


const SucursalController = require('../../../api/controllers/sucursal.controller');
const SucursalService = require('../../../contexts/sucursales/services/sucursal.service');
const SucursalBusiness = require('../../../contexts/sucursales/domain/sucursal.business');


const SucursalRepository = require('../../../contexts/sucursales/dataAccess/sucursal.repository')
const RegionRepository = require('../../../contexts/sucursales/dataAccess/regiones.repository');


module.exports = (container) => {
    container.register({
        SucursalRoutes: asFunction(SucursalRoutes).singleton(),
        RegionRoutes: asFunction(RegionRoutes).singleton(),

        SucursalController: asClass(SucursalController).singleton(),
        SucursalService: asClass(SucursalService).singleton(),
        SucursalBusiness: asClass(SucursalBusiness).singleton(),

        SucursalRepository: asClass(SucursalRepository).singleton(),
        RegionRepository: asClass(RegionRepository).singleton()
    })
    return container;
}



