const router = require("express").Router();
module.exports = ({ WebRentACarController }) => {

    router.post("/registrarReservaYCliente", WebRentACarController.createReservaYCliente.bind(WebRentACarController));
    router.get("/mostrarVehiculosDisponibles", WebRentACarController.vehiculosDisponibles.bind(WebRentACarController));

    return router;
}

