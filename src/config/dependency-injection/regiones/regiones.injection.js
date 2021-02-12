const { asClass, asFunction } = require('awilix');

const RegionRoutes = require('../../../routes/api/regiones.routes');
const RegionController = require('../../../controllers/regiones.controller');
const RegionService = require('../../../services/regiones.service');

module.exports = (container) => {
    container.register({
        RegionRoutes: asFunction(RegionRoutes).singleton(),
        RegionController: asClass(RegionController).singleton(),
        RegionService: asClass(RegionService).singleton()
    })
    return container;
}
