const { asClass, asFunction } = require('awilix');

const PagoRoutes = require('../../../routes/api/pagos.routes');
const PagoController = require('../../../controllers/pago.controller');
const PagoService = require('../../../services/pago.service')

module.exports = (container) => {
    container.register({
        PagoRoutes: asFunction(PagoRoutes).singleton(),
        PagoController: asClass(PagoController).singleton(),
        PagoService: asClass(PagoService).singleton()
    })
    return container;
}
