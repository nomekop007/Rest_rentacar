const { asClass, asFunction } = require('awilix');

const PagoRoutes = require('../../../api/routes/apis/pagos.routes');
const PagoController = require('../../../api/controllers/pago.controller');
const PagoRepository = require('../../../contexts/pagos/dataAccess/pago.repository')

module.exports = (container) => {
    container.register({
        PagoRoutes: asFunction(PagoRoutes).singleton(),
        PagoController: asClass(PagoController).singleton(),
        PagoRepository: asClass(PagoRepository).singleton()
    })
    return container;
}
