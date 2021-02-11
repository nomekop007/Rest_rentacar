const router = require("express").Router();
module.exports = ({ DanioVehiculoController }) => {

    router.post("/registrarDanioVehiculos", DanioVehiculoController.createDanioVehiculo.bind(DanioVehiculoController));
    router.get("/revisarDanioVehiculo/:id", DanioVehiculoController.consultarDanioVehiculo.bind(DanioVehiculoController));
    router.get("/cargarDaniosVehiculos", DanioVehiculoController.getDanioVehiculo.bind(DanioVehiculoController));
    router.put("/actualizarDanioVehiculo/:id", DanioVehiculoController.updateDanioVehiculo.bind(DanioVehiculoController));

    return router;

}
