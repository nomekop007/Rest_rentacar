const { asClass, asFunction } = require('awilix');

const ConductorRoutes = require('../../../api/routes/apis/conductores.routes');
const ConductorController = require('../../../api/controllers/conductor.controller');
const ConductorService = require('../../../services/conductor.service');

module.exports = (container) => {
    container.register({
        ConductorRoutes: asFunction(ConductorRoutes).singleton(),
        ConductorController: asClass(ConductorController).singleton(),
        ConductorService: asClass(ConductorService).singleton()
    })
    return container;
}


