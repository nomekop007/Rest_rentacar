const router = require("express").Router();
const PagoArriendo_controller = require("../../controllers/pagoArriendo.controller");
const pagoArriendo = new PagoArriendo_controller();

router.post("/registrarPagoArriendo", pagoArriendo.createPagoArriendo.bind(pagoArriendo));

router.get("/consultarPagosArriendo/:id", pagoArriendo.consultarPagosArriendo.bind(pagoArriendo));

module.exports = router;