const { asClass, asFunction } = require('awilix');

const DanioVehiculoRoutes = require('../../../api/routes/apis/danioVehiculos.routes');
const DanioVehiculoController = require('../../../api/controllers/danioVehiculo.controller');
const DanioVehiculoRepository = require('../../../contexts/vehiculos/dataAccess/danioVehiculo.repository');

module.exports = (container) => {
    container.register({
        DanioVehiculoRoutes: asFunction(DanioVehiculoRoutes).singleton(),
        DanioVehiculoController: asClass(DanioVehiculoController).singleton(),
        DanioVehiculoRepository: asClass(DanioVehiculoRepository).singleton()
    })
    return container;
}

