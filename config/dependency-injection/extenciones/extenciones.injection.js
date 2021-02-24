const { asClass, asFunction } = require('awilix');

const ExtencionRoutes = require('../../../api/routes/apis/extenciones.routes');
const ExtencionController = require('../../../api/controllers/extencion.controller');
const ExtencionRepository = require('../../../contexts/arriendos/dataAccess/extencion.repository');

module.exports = (container) => {
    container.register({
        ExtencionRoutes: asFunction(ExtencionRoutes).singleton(),
        ExtencionController: asClass(ExtencionController).singleton(),
        ExtencionRepository: asClass(ExtencionRepository).singleton()
    })
    return container;
}


