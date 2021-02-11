const { asClass, asFunction } = require('awilix');

const RequisitoRoutes = require('../../../routes/api/requisitos.routes');
const RequisitoController = require('../../../controllers/requisito.controller');
const RequisitoService = require('../../../services/requisito.service');

module.exports = (container) => {
    container.register({
        RequisitoRoutes: asFunction(RequisitoRoutes).singleton(),
        RequisitoController: asClass(RequisitoController).singleton(),
        RequisitoService: asClass(RequisitoService).singleton()
    })
    return container;
}