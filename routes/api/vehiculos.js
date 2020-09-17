const router = require("express").Router();
const VehiculoController = require("../../controllers/vehiculo_controller");
const vehiculo = new VehiculoController();

router.get("/cargarVehiculos", vehiculo.getVehiculos.bind(vehiculo));

router.post("/registrarVehiculo", vehiculo.createVehiculo.bind(vehiculo));

router.put("/editarVehiculo/:id", vehiculo.updateVehiculo.bind(vehiculo));

router.delete("/eliminarVehiculo/:id", vehiculo.deleteVehiculo.bind(vehiculo));

module.exports = router;