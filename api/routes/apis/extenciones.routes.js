const router = require("express").Router();
module.exports = ({ ArriendoController }) => {

    router.get("/buscarExtencionesPorArriendo/:id", ArriendoController.buscarExtencionesPorArriendo.bind(ArriendoController));
    router.post("/registrarExtencion", ArriendoController.createExtencionArriendo.bind(ArriendoController));

    return router;
}

