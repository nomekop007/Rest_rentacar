const router = require("express").Router();
module.exports = ({ VehiculoController, subirImageVehiculo }) => {

    router.get("/cargarVehiculos", VehiculoController.getVehiculos.bind(VehiculoController));
    router.get("/cargarTotalVehiculos", VehiculoController.getAllVehiculos.bind(VehiculoController));
    router.get("/cargarVehiculosArrendados", VehiculoController.getVehiculosArrendados.bind(VehiculoController));
    router.get("/cargarVehiculosDisponibles", VehiculoController.getVehiculosDisponibles.bind(VehiculoController));
    router.get("/cargarVehiculosDisponiblesPorSucursal/:id", VehiculoController.getVehiculosDisponiblesBySucursal.bind(VehiculoController));
    router.get("/buscarVehiculo/:id", VehiculoController.findVehiculo.bind(VehiculoController));
    router.put("/editarVehiculo/:id", VehiculoController.updateVehiculo.bind(VehiculoController));
    router.put("/cambiarEstadoVehiculo/:id", VehiculoController.updateStateVehiculo.bind(VehiculoController));
    router.post("/registrarVehiculo", VehiculoController.createVehiculo.bind(VehiculoController));
    router.post("/cargarImagen/:id", subirImageVehiculo, VehiculoController.uploadImageVehiculo.bind(VehiculoController));
    router.delete("/eliminarVehiculo/:id", VehiculoController.deleteVehiculo.bind(VehiculoController));

    return router;
}

