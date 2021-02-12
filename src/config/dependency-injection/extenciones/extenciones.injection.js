const { asClass, asFunction } = require('awilix');

const ExtencionRoutes = require('../../../routes/api/extenciones.routes');
const ExtencionController = require('../../../controllers/extencion.controller');
const ExtencionService = require('../../../services/extencion.service')

module.exports = (container) => {
    container.register({
        ExtencionRoutes: asFunction(ExtencionRoutes).singleton(),
        ExtencionController: asClass(ExtencionController).singleton(),
        ExtencionService: asClass(ExtencionService).singleton()
    })
    return container;
}


