const { asClass, asFunction } = require('awilix');

const PagoDanioRoutes = require('../../../api/routes/apis/pagosDanios.routes');
const PagoDanioController = require('../../../api/controllers/pagoDanio.controller');
const PagoDanioService = require('../../../contexts/pagos/dataAccess/pagoDanio.repository')

module.exports = (container) => {
    container.register({
        PagoDanioRoutes: asFunction(PagoDanioRoutes).singleton(),
        PagoDanioController: asClass(PagoDanioController).singleton(),
        PagoDanioService: asClass(PagoDanioService).singleton()
    })
    return container;
}
