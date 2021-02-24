const { asClass, asFunction } = require('awilix');

const RequisitoRoutes = require('../../../api/routes/apis/requisitos.routes');
const RequisitoController = require('../../../api/controllers/requisito.controller');
const RequisitoRepository = require('../../../contexts/arriendos/dataAccess/requisito.repository');

module.exports = (container) => {
    container.register({
        RequisitoRoutes: asFunction(RequisitoRoutes).singleton(),
        RequisitoController: asClass(RequisitoController).singleton(),
        RequisitoRepository: asClass(RequisitoRepository).singleton()
    })
    return container;
}