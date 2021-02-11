const { asClass, asFunction } = require('awilix');

const PagoAccesorioRoutes = require('../../../routes/api/pagosAccesorios.routes');
const PagoAccesorioController = require('../../../controllers/pagoAccesorio.controller');
const PagoAccesorioService = require('../../../services/pagoAccesorio.service')

module.exports = (container) => {
    container.register({
        PagoAccesorioRoutes: asFunction(PagoAccesorioRoutes).singleton(),
        PagoAccesorioController: asClass(PagoAccesorioController).singleton(),
        PagoAccesorioService: asClass(PagoAccesorioService).singleton()
    })
    return container;
}