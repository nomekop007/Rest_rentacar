const router = require("express").Router();
module.exports = ({ PagoAccesorioController }) => {

    router.post("/registrarPagosAccesorios", PagoAccesorioController.createPagoAccesorios.bind(PagoAccesorioController));

    return router;
}

