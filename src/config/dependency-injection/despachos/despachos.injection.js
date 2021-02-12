const { asClass, asFunction } = require('awilix');

const DespachoRoutes = require('../../../routes/api/despachos.routes');
const DespachoController = require('../../../controllers/despacho.controller');
const DespachoService = require('../../../services/despacho.service');

module.exports = (container) => {
    container.register({
        DespachoRoutes: asFunction(DespachoRoutes).singleton(),
        DespachoController: asClass(DespachoController).singleton(),
        DespachoService: asClass(DespachoService).singleton()
    })
    return container;
}
