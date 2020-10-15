const router = require("express").Router();
const { subirImageVehiculo } = require("../middlewares/upload_middleware");
const VehiculoController = require("../../controllers/vehiculo_controller");
const vehiculo = new VehiculoController();

router.post("/cargarVehiculos", vehiculo.getVehiculos.bind(vehiculo));
router.get("/buscarVehiculo/:id", vehiculo.findVehiculo.bind(vehiculo));

router.post("/registrarVehiculo", vehiculo.createVehiculo.bind(vehiculo));

router.put("/editarVehiculo/:id", vehiculo.updateVehiculo.bind(vehiculo));

router.delete("/eliminarVehiculo/:id", vehiculo.deleteVehiculo.bind(vehiculo));

router.post(
    "/cargarImagen/:id",
    subirImageVehiculo,
    vehiculo.uploadImageVehiculo.bind(vehiculo)
);

module.exports = router;