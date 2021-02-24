const { asClass, asFunction } = require('awilix');

const PagoAccesorioRoutes = require('../../../api/routes/apis/pagosAccesorios.routes');
const PagoAccesorioController = require('../../../api/controllers/pagoAccesorio.controller');
const PagoAccesorioRepository = require('../../../contexts/pagos/dataAccess/pagoAccesorio.repository')

module.exports = (container) => {
    container.register({
        PagoAccesorioRoutes: asFunction(PagoAccesorioRoutes).singleton(),
        PagoAccesorioController: asClass(PagoAccesorioController).singleton(),
        PagoAccesorioRepository: asClass(PagoAccesorioRepository).singleton()
    })
    return container;
}