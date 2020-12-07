const router = require("express").Router();
const Pago_controller = require("../../controllers/pago.controller");
const pago = new Pago_controller();

router.post("/registrarPago", pago.createPago.bind(pago));

router.post("/actualizarPago", pago.updatePagos.bind(pago));

router.get("/cargarPagosERpendientes", pago.getPagosRemplazosPendientes.bind(pago));

router.get("/buscarPagoERpendientes/:id", pago.findPagosRemplazosPendientes.bind(pago));

router.post("/aplicarDescuentoPago", pago.aplicarDescuentoPago.bind(pago));

module.exports = router;