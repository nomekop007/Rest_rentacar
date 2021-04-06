const router = require("express").Router();
module.exports = ({ VehiculoController, subirImageVehiculo }) => {

    router.get("/cargarVehiculos", VehiculoController.getVehiculos.bind(VehiculoController));
    router.get("/cargarVehiculosArrendados", VehiculoController.getVehiculosArrendados.bind(VehiculoController));
    router.get("/cargarVehiculosDisponibles", VehiculoController.getVehiculosDisponibles.bind(VehiculoController));
    router.get("/cargarVehiculosDisponiblesPorSucursal/:id", VehiculoController.getVehiculosDisponiblesBySucursal.bind(VehiculoController));
    router.get("/cargarVehiculosArrendadosPorSucursal/:id", VehiculoController.getVehiculosArrendadosBySucursal.bind(VehiculoController));
    router.get("/buscarVehiculo/:id", VehiculoController.findVehiculo.bind(VehiculoController));
    router.put("/editarVehiculo/:id", VehiculoController.updateVehiculo.bind(VehiculoController));
    router.put("/cambiarEstadoVehiculo/:id", VehiculoController.updateStateVehiculo.bind(VehiculoController));
    router.post("/registrarVehiculo", VehiculoController.createVehiculo.bind(VehiculoController));
    router.post("/cargarImagen/:id", subirImageVehiculo, VehiculoController.uploadImageVehiculo.bind(VehiculoController));
    router.delete("/eliminarVehiculo/:id", VehiculoController.deleteVehiculo.bind(VehiculoController));

    router.post("/registrarDanioVehiculos", VehiculoController.createDanioVehiculo.bind(VehiculoController));
    router.get("/revisarDanioVehiculo/:id", VehiculoController.consultarDanioVehiculo.bind(VehiculoController));
    router.get("/cargarDaniosVehiculos", VehiculoController.getDanioVehiculo.bind(VehiculoController));
    router.put("/actualizarDanioVehiculo/:id", VehiculoController.updateDanioVehiculo.bind(VehiculoController));

    router.post('/registrarTarifa', VehiculoController.createTarifaVehiculo.bind(VehiculoController));
    router.get('/cargarTarifasVehiculos', VehiculoController.getTarifaVehiculo.bind(VehiculoController));
    router.get('/buscarTarifaVehiculoPorDias', VehiculoController.findTarifaVehiculoByDias.bind(VehiculoController));

    router.post('/registar_danio_vehiculo_new', VehiculoController.registrar_danio_vehiculo_new.bind(VehiculoController));

    router.delete('/eliminar_danio_vehiculo/:id', VehiculoController.eliminar_danio_vehiculo_new.bind(VehiculoController));
    return router;
}

