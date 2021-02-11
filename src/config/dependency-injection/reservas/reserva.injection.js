const { asClass, asFunction } = require('awilix');

const ReservaRoutes = require('../../../routes/api/reservas.routes');
const ReservaController = require('../../../controllers/reserva.controller');
const ReservaService = require('../../../services/reserva.service')

module.exports = (container) => {
    container.register({
        ReservaRoutes: asFunction(ReservaRoutes).singleton(),
        ReservaController: asClass(ReservaController).singleton(),
        ReservaService: asClass(ReservaService).singleton()
    })
    return container;
}


