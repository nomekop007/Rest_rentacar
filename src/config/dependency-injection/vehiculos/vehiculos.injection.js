const { asClass, asFunction } = require('awilix');

const VehiculoRoutes = require('../../../routes/api/vehiculos.routes');
const VehiculoController = require('../../../controllers/vehiculo.controller');
const VehiculoService = require('../../../services/vehiculo.service')

module.exports = (container) => {
    container.register({
        VehiculoRoutes: asFunction(VehiculoRoutes).singleton(),
        VehiculoController: asClass(VehiculoController).singleton(),
        VehiculoService: asClass(VehiculoService).singleton()
    })
    return container;
}