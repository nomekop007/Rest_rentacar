const router = require("express").Router();
module.exports = ({ PagoController }) => {

    router.post("/registrarPagoArriendo", PagoController.createPagoArriendo.bind(PagoController));
    router.get("/consultarPagosArriendo/:id", PagoController.consultarPagosArriendo.bind(PagoController));

    return router;
}
