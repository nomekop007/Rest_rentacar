const router = require("express").Router();
const Pago_controller = require("../../controllers/pago_controller");
const pago = new Pago_controller();

//middlewares
const check = require("../../middlewares/check_middleware");

router.post("/registrarPago", check.checkToken, pago.createPago.bind(pago));
router.get("/mostrarPagosFinanzas", pago.getPagoFinanzas.bind(pago));


module.exports = router;