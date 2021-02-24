
const { asClass, asFunction } = require('awilix');

const TarifaVehiculoRoutes = require('../../../api/routes/apis/tarifasVehiculos.routes');
const TarifaVehiculoController = require('../../../api/controllers/tarifaVehiculo.controller');
const TarifaVehiculoService = require('../../../contexts/vehiculos/dataAccess/tarifaVehiculo.repository')

module.exports = (container) => {
    container.register({
        TarifaVehiculoRoutes: asFunction(TarifaVehiculoRoutes).singleton(),
        TarifaVehiculoController: asClass(TarifaVehiculoController).singleton(),
        TarifaVehiculoService: asClass(TarifaVehiculoService).singleton()
    })
    return container;
}



