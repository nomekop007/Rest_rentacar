const { asClass, asFunction } = require('awilix');

const DanioVehiculoRoutes = require('../../../api/routes/apis/danioVehiculos.routes');
const DanioVehiculoController = require('../../../api/controllers/danioVehiculo.controller');
const DanioVehiculoService = require('../../../services/danioVehiculo.service')

module.exports = (container) => {
    container.register({
        DanioVehiculoRoutes: asFunction(DanioVehiculoRoutes).singleton(),
        DanioVehiculoController: asClass(DanioVehiculoController).singleton(),
        DanioVehiculoService: asClass(DanioVehiculoService).singleton()
    })
    return container;
}

