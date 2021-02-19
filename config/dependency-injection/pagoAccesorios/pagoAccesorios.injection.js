const { asClass, asFunction } = require('awilix');

const PagoAccesorioRoutes = require('../../../api/routes/apis/pagosAccesorios.routes');
const PagoAccesorioController = require('../../../api/controllers/pagoAccesorio.controller');
const PagoAccesorioService = require('../../../services/pagoAccesorio.service')

module.exports = (container) => {
    container.register({
        PagoAccesorioRoutes: asFunction(PagoAccesorioRoutes).singleton(),
        PagoAccesorioController: asClass(PagoAccesorioController).singleton(),
        PagoAccesorioService: asClass(PagoAccesorioService).singleton()
    })
    return container;
}