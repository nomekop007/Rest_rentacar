const router = require("express").Router();
module.exports = ({ VehiculoController }) => {

    router.post("/registrarDanioVehiculos", VehiculoController.createDanioVehiculo.bind(VehiculoController));
    router.get("/revisarDanioVehiculo/:id", VehiculoController.consultarDanioVehiculo.bind(VehiculoController));
    router.get("/cargarDaniosVehiculos", VehiculoController.getDanioVehiculo.bind(VehiculoController));
    router.put("/actualizarDanioVehiculo/:id", VehiculoController.updateDanioVehiculo.bind(VehiculoController));

    return router;

}
