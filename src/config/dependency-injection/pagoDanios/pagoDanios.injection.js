const { asClass, asFunction } = require('awilix');

const PagoDanioRoutes = require('../../../routes/api/pagosDanios.routes');
const PagoDanioController = require('../../../controllers/pagoDanio.controller');
const PagoDanioService = require('../../../services/pagoDanio.service')

module.exports = (container) => {
    container.register({
        PagoDanioRoutes: asFunction(PagoDanioRoutes).singleton(),
        PagoDanioController: asClass(PagoDanioController).singleton(),
        PagoDanioService: asClass(PagoDanioService).singleton()
    })
    return container;
}
