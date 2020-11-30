const router = require("express").Router();
const DanioVehiculoController = require("../../controllers/danioVehiculo_controller");
const danioVehiculo = new DanioVehiculoController();

router.post("/registrarDanioVehiculos", danioVehiculo.createDanioVehiculo.bind(danioVehiculo));

router.get("/revisarDanioVehiculo/:id", danioVehiculo.consultarDanioVehiculo.bind(danioVehiculo));

module.exports = router;