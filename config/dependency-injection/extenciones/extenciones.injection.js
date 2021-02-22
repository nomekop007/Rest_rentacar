const { asClass, asFunction } = require('awilix');

const ExtencionRoutes = require('../../../api/routes/apis/extenciones.routes');
const ExtencionController = require('../../../api/controllers/extencion.controller');
const ExtencionService = require('../../../contexts/arriendos/dataAccess/extencion.repository');

module.exports = (container) => {
    container.register({
        ExtencionRoutes: asFunction(ExtencionRoutes).singleton(),
        ExtencionController: asClass(ExtencionController).singleton(),
        ExtencionService: asClass(ExtencionService).singleton()
    })
    return container;
}


