const { asClass, asFunction } = require('awilix');

const VehiculoRoutes = require('../../../api/routes/apis/vehiculos.routes');
const VehiculoController = require('../../../api/controllers/vehiculo.controller');
const VehiculoService = require('../../../contexts/vehiculos/services/vehiculo.service');
const VehiculoBusiness = require('../../../contexts/vehiculos/domain/vehiculo.business');
const VehiculoRepository = require('../../../contexts/vehiculos/dataAccess/vehiculo.repository');

module.exports = (container) => {
    container.register({
        VehiculoRoutes: asFunction(VehiculoRoutes).singleton(),
        VehiculoController: asClass(VehiculoController).singleton(),
        VehiculoService: asClass(VehiculoService).singleton(),
        VehiculoBusiness: asClass(VehiculoBusiness).singleton(),
        VehiculoRepository: asClass(VehiculoRepository).singleton(),
    })
    return container;
}