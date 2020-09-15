const router = require("express").Router();
const PagoArriendoController = require("../../controllers/pagoArriendo_controller");
const pagoArriendo = new PagoArriendoController();

router.post("/registrarPagosArriendos", pagoArriendo.createPagoArriendo.bind(pagoArriendo));

module.exports = router;