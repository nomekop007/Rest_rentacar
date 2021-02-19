const { asClass, asFunction } = require('awilix');

const RegionRoutes = require('../../../api/routes/apis/regiones.routes');
const RegionController = require('../../../api/controllers/regiones.controller');
const RegionService = require('../../../services/regiones.service');

module.exports = (container) => {
    container.register({
        RegionRoutes: asFunction(RegionRoutes).singleton(),
        RegionController: asClass(RegionController).singleton(),
        RegionService: asClass(RegionService).singleton()
    })
    return container;
}
