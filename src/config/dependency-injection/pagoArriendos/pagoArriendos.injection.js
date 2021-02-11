const { asClass, asFunction } = require('awilix');

const PagoArriendoRoutes = require('../../../routes/api/pagosArriendos.routes');
const PagoArriendoController = require('../../../controllers/pagoArriendo.controller');
const PagoArriendoService = require('../../../services/pagoArriendo.service')

module.exports = (container) => {
    container.register({
        PagoArriendoRoutes: asFunction(PagoArriendoRoutes).singleton(),
        PagoArriendoController: asClass(PagoArriendoController).singleton(),
        PagoArriendoService: asClass(PagoArriendoService).singleton(),
    })
    return container;
}
