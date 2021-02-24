const { asClass, asFunction } = require('awilix');

const DanioVehiculoRoutes = require('../../../api/routes/apis/danioVehiculos.routes');
const DanioVehiculoController = require('../../../api/controllers/danioVehiculo.controller');
const DanioVehiculoService = require('../../../contexts/vehiculos/dataAccess/danioVehiculo.repository');

module.exports = (container) => {
    container.register({
        DanioVehiculoRoutes: asFunction(DanioVehiculoRoutes).singleton(),
        DanioVehiculoController: asClass(DanioVehiculoController).singleton(),
        DanioVehiculoService: asClass(DanioVehiculoService).singleton()
    })
    return container;
}

