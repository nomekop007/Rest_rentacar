const { asClass, asFunction } = require('awilix');

const DespachoRoutes = require('../../../api/routes/apis/despachos.routes');
const DespachoController = require('../../../api/controllers/despacho.controller');
const DespachoService = require('../../../contexts/despachos/dataccess/despacho.repository');

module.exports = (container) => {
    container.register({
        DespachoRoutes: asFunction(DespachoRoutes).singleton(),
        DespachoController: asClass(DespachoController).singleton(),
        DespachoService: asClass(DespachoService).singleton()
    })
    return container;
}
