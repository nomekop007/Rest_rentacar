
const { asClass, asFunction } = require('awilix');

const TarifaVehiculoRoutes = require('../../../routes/api/tarifasVehiculos.routes');
const TarifaVehiculoController = require('../../../controllers/tarifaVehiculo.controller');
const TarifaVehiculoService = require('../../../services/tarifasVehiculo.service')

module.exports = (container) => {
    container.register({
        TarifaVehiculoRoutes: asFunction(TarifaVehiculoRoutes).singleton(),
        TarifaVehiculoController: asClass(TarifaVehiculoController).singleton(),
        TarifaVehiculoService: asClass(TarifaVehiculoService).singleton()
    })
    return container;
}



