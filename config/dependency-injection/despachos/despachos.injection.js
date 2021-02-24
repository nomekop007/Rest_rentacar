const { asClass, asFunction } = require('awilix');

const DespachoRoutes = require('../../../api/routes/apis/despachos.routes');
const DespachoController = require('../../../api/controllers/despacho.controller');
const DespachoRepository = require('../../../contexts/despachos/dataccess/despacho.repository');

module.exports = (container) => {
    container.register({
        DespachoRoutes: asFunction(DespachoRoutes).singleton(),
        DespachoController: asClass(DespachoController).singleton(),
        DespachoRepository: asClass(DespachoRepository).singleton()
    })
    return container;
}
