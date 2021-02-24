const { asClass, asFunction } = require('awilix');

const RegionRoutes = require('../../../api/routes/apis/regiones.routes');
const RegionController = require('../../../api/controllers/regiones.controller');
const RegionService = require('../../../contexts/regiones/services/region.service');
const RegionBusiness = require('../../../contexts/regiones/domain/region.business');
const RegionRepository = require('../../../contexts/regiones/dataAccess/regiones.repository');

module.exports = (container) => {
    container.register({
        RegionRoutes: asFunction(RegionRoutes).singleton(),
        RegionController: asClass(RegionController).singleton(),
        RegionService: asClass(RegionService).singleton(),
        RegionBusiness: asClass(RegionBusiness).singleton(),
        RegionRepository: asClass(RegionRepository).singleton()
    })
    return container;
}
