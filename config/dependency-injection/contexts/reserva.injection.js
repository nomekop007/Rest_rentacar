const { asClass, asFunction } = require('awilix');

const ReservaRoutes = require('../../../api/routes/apis/reservas.routes');
const ReservaController = require('../../../api/controllers/reserva.controller');
const ReservaService = require('../../../contexts/reservas/services/reserva.service');
const ReservaBusiness = require('../../../contexts/reservas/domain/reserva.business');
const ReservaRepository = require('../../../contexts/reservas/dataAccess/reserva.repository')


module.exports = (container) => {
    container.register({
        ReservaRoutes: asFunction(ReservaRoutes).singleton(),
        ReservaController: asClass(ReservaController).singleton(),
        ReservaService: asClass(ReservaService).singleton(),
        ReservaBusiness: asClass(ReservaBusiness).singleton(),
        ReservaRepository: asClass(ReservaRepository).singleton()
    })
    return container;
}


