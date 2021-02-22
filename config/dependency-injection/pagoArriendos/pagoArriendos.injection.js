const { asClass, asFunction } = require('awilix');

const PagoArriendoRoutes = require('../../../api/routes/apis/pagosArriendos.routes');
const PagoArriendoController = require('../../../api/controllers/pagoArriendo.controller');
const PagoArriendoService = require('../../../contexts/pagos/dataAccess/pagoArriendo.repository')

module.exports = (container) => {
    container.register({
        PagoArriendoRoutes: asFunction(PagoArriendoRoutes).singleton(),
        PagoArriendoController: asClass(PagoArriendoController).singleton(),
        PagoArriendoService: asClass(PagoArriendoService).singleton(),
    })
    return container;
}
