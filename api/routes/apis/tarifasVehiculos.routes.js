const router = require('express').Router();
module.exports = ({ TarifaVehiculoController }) => {

    router.post('/registrarTarifa', TarifaVehiculoController.createTarifaVehiculo.bind(TarifaVehiculoController));
    router.get('/cargarTarifasVehiculos', TarifaVehiculoController.getTarifaVehiculo.bind(TarifaVehiculoController));
    router.get('/buscarTarifaVehiculoPorDias', TarifaVehiculoController.findTarifaVehiculoByDias.bind(TarifaVehiculoController));

    return router
}

