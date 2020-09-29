const router = require("express").Router();
const Pago_controller = require("../../controllers/pago_controller");
const pago = new Pago_controller();

router.post("/registrarPagosArriendos", pago.createPago.bind(pago));

module.exports = router;