const router = require('express').Router();
module.exports = ({ VehiculoController }) => {

    router.post('/registrarTarifa', VehiculoController.createTarifaVehiculo.bind(VehiculoController));
    router.get('/cargarTarifasVehiculos', VehiculoController.getTarifaVehiculo.bind(VehiculoController));
    router.get('/buscarTarifaVehiculoPorDias', VehiculoController.findTarifaVehiculoByDias.bind(VehiculoController));

    return router
}

