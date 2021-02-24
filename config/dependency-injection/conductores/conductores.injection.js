const { asClass, asFunction } = require('awilix');

const ConductorRoutes = require('../../../api/routes/apis/conductores.routes');
const ConductorController = require('../../../api/controllers/conductor.controller');
const ConductorRepository = require('../../../contexts/clientes/dataAccess/conductor.repository');

module.exports = (container) => {
    container.register({
        ConductorRoutes: asFunction(ConductorRoutes).singleton(),
        ConductorController: asClass(ConductorController).singleton(),
        ConductorRepository: asClass(ConductorRepository).singleton()
    })
    return container;
}


