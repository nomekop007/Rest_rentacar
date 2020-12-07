const router = require("express").Router();
const DanioVehiculoController = require("../../controllers/danioVehiculo.controller");
const danioVehiculo = new DanioVehiculoController();

router.post("/registrarDanioVehiculos", danioVehiculo.createDanioVehiculo.bind(danioVehiculo));

router.get("/revisarDanioVehiculo/:id", danioVehiculo.consultarDanioVehiculo.bind(danioVehiculo));

router.get("/cargarDanios", danioVehiculo.getDanio.bind(danioVehiculo))

module.exports = router;