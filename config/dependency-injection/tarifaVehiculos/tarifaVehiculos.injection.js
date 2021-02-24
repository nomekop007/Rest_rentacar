
const { asClass, asFunction } = require('awilix');

const TarifaVehiculoRoutes = require('../../../api/routes/apis/tarifasVehiculos.routes');
const TarifaVehiculoController = require('../../../api/controllers/tarifaVehiculo.controller');
const TarifaVehiculoRepository = require('../../../contexts/vehiculos/dataAccess/tarifaVehiculo.repository')

module.exports = (container) => {
    container.register({
        TarifaVehiculoRoutes: asFunction(TarifaVehiculoRoutes).singleton(),
        TarifaVehiculoController: asClass(TarifaVehiculoController).singleton(),
        TarifaVehiculoRepository: asClass(TarifaVehiculoRepository).singleton()
    })
    return container;
}



