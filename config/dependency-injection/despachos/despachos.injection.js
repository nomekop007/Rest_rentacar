const { asClass, asFunction } = require('awilix');

const DespachoRoutes = require('../../../api/routes/apis/despachos.routes');
const DespachoController = require('../../../api/controllers/despacho.controller');
const DespachoService = require('../../../services/despacho.service');

module.exports = (container) => {
    container.register({
        DespachoRoutes: asFunction(DespachoRoutes).singleton(),
        DespachoController: asClass(DespachoController).singleton(),
        DespachoService: asClass(DespachoService).singleton()
    })
    return container;
}
