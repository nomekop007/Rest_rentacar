const router = require("express").Router();
module.exports = ({ PagoController }) => {

    router.post("/registrarAbono", PagoController.createAbonoWithFacturacion.bind(PagoController));

    return router;
}
