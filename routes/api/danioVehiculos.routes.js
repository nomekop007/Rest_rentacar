const router = require("express").Router();
const DanioVehiculoController = require("../../controllers/danioVehiculo.controller");
const danioVehiculo = new DanioVehiculoController();

router.post("/registrarDanioVehiculos", danioVehiculo.createDanioVehiculo.bind(danioVehiculo));

router.get("/revisarDanioVehiculo/:id", danioVehiculo.consultarDanioVehiculo.bind(danioVehiculo));

router.get("/cargarDaniosVehiculos", danioVehiculo.getDanioVehiculo.bind(danioVehiculo));

router.put("/actualizarDanioVehiculo/:id", danioVehiculo.updateDanioVehiculo.bind(danioVehiculo));

module.exports = router;