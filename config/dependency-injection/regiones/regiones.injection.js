const { asClass, asFunction } = require('awilix');

const RegionRoutes = require('../../../api/routes/apis/regiones.routes');
const RegionController = require('../../../api/controllers/regiones.controller');
const RegionRepository = require('../../../contexts/regiones/dataAccess/regiones.repository');

module.exports = (container) => {
    container.register({
        RegionRoutes: asFunction(RegionRoutes).singleton(),
        RegionController: asClass(RegionController).singleton(),
        RegionRepository: asClass(RegionRepository).singleton()
    })
    return container;
}
