const router = require("express").Router();
module.exports = ({ PagoController }) => {

    router.post("/registrarPagoDanio", PagoController.createPagoDanio.bind(PagoController));

    return router;
}


