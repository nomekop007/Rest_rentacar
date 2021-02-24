const { asClass, asFunction } = require('awilix');

const RequisitoRoutes = require('../../../api/routes/apis/requisitos.routes');
const RequisitoController = require('../../../api/controllers/requisito.controller');
const RequisitoService = require('../../../contexts/arriendos/dataAccess/requisito.repository');

module.exports = (container) => {
    container.register({
        RequisitoRoutes: asFunction(RequisitoRoutes).singleton(),
        RequisitoController: asClass(RequisitoController).singleton(),
        RequisitoService: asClass(RequisitoService).singleton()
    })
    return container;
}