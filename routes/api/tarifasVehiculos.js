const router = require('express').Router();
const TarifaVehiculoController = require('../../controllers/tarifaVehiculo.controller');
const tarifaVehiculo = new TarifaVehiculoController();

router.post('/registrarTarifa', tarifaVehiculo.createTarifaVehiculo.bind(tarifaVehiculo));

router.get('/cargarTarifasVehiculos', tarifaVehiculo.getTarifaVehiculo.bind(tarifaVehiculo));

module.exports = router;