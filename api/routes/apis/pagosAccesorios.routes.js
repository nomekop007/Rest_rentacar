const router = require("express").Router();
module.exports = ({ PagoController }) => {

    router.post("/registrarPagosAccesorios", PagoController.createPagoAccesorios.bind(PagoController));

    return router;
}

