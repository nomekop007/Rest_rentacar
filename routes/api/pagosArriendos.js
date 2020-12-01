const router = require("express").Router();
const PagoArriendo_controller = require("../../controllers/pagoArriendo_controller");
const pagoArriendo = new PagoArriendo_controller();

router.post("/registrarPagoArriendo", pagoArriendo.createPagoArriendo.bind(pagoArriendo));

router.get("/revisarEstadoPago/:id", pagoArriendo.consultarPagosPendientes.bind(pagoArriendo));

module.exports = router;