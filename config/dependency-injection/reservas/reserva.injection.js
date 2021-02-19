const { asClass, asFunction } = require('awilix');

const ReservaRoutes = require('../../../api/routes/apis/reservas.routes');
const ReservaController = require('../../../api/controllers/reserva.controller');
const ReservaService = require('../../../services/reserva.service')

module.exports = (container) => {
    container.register({
        ReservaRoutes: asFunction(ReservaRoutes).singleton(),
        ReservaController: asClass(ReservaController).singleton(),
        ReservaService: asClass(ReservaService).singleton()
    })
    return container;
}


