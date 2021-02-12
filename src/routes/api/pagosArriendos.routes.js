const router = require("express").Router();
module.exports = ({ PagoArriendoController }) => {

    router.post("/registrarPagoArriendo", PagoArriendoController.createPagoArriendo.bind(PagoArriendoController));
    router.get("/consultarPagosArriendo/:id", PagoArriendoController.consultarPagosArriendo.bind(PagoArriendoController));

    return router;
}
