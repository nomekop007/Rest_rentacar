const { asClass, asFunction } = require('awilix');

const VehiculoRoutes = require('../../../api/routes/apis/vehiculos.routes');
const DanioVehiculoRoutes = require('../../../api/routes/apis/danioVehiculos.routes');
const TarifaVehiculoRoutes = require('../../../api/routes/apis/tarifasVehiculos.routes');

const VehiculoController = require('../../../api/controllers/vehiculo.controller');
const DanioVehiculoController = require('../../../api/controllers/danioVehiculo.controller');
const TarifaVehiculoController = require('../../../api/controllers/tarifaVehiculo.controller');

const VehiculoService = require('../../../contexts/vehiculos/services/vehiculo.service');
const VehiculoBusiness = require('../../../contexts/vehiculos/domain/vehiculo.business');

const VehiculoRepository = require('../../../contexts/vehiculos/dataAccess/vehiculo.repository');
const DanioVehiculoRepository = require('../../../contexts/vehiculos/dataAccess/danioVehiculo.repository');
const TarifaVehiculoRepository = require('../../../contexts/vehiculos/dataAccess/tarifaVehiculo.repository')



module.exports = (container) => {
    container.register({
        VehiculoRoutes: asFunction(VehiculoRoutes).singleton(),
        TarifaVehiculoRoutes: asFunction(TarifaVehiculoRoutes).singleton(),
        DanioVehiculoRoutes: asFunction(DanioVehiculoRoutes).singleton(),

        VehiculoController: asClass(VehiculoController).singleton(),
        DanioVehiculoController: asClass(DanioVehiculoController).singleton(),
        TarifaVehiculoController: asClass(TarifaVehiculoController).singleton(),

        VehiculoBusiness: asClass(VehiculoBusiness).singleton(),
        VehiculoService: asClass(VehiculoService).singleton(),

        VehiculoRepository: asClass(VehiculoRepository).singleton(),
        DanioVehiculoRepository: asClass(DanioVehiculoRepository).singleton(),
        TarifaVehiculoRepository: asClass(TarifaVehiculoRepository).singleton()
    })
    return container;
}