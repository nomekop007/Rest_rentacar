const { asClass, asFunction } = require('awilix');

const ConductorRoutes = require('../../../routes/api/conductores.routes');
const ConductorController = require('../../../controllers/conductor.controller');
const ConductorService = require('../../../services/conductor.service');

module.exports = (container) => {
    container.register({
        ConductorRoutes: asFunction(ConductorRoutes).singleton(),
        ConductorController: asClass(ConductorController).singleton(),
        ConductorService: asClass(ConductorService).singleton()
    })
    return container;
}


