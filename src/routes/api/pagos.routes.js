const router = require("express").Router();
const Pago_controller = require("../../controllers/pago.controller");
const pago = new Pago_controller();

router.post("/registrarPago", pago.createPago.bind(pago));

router.post("/actualizarPagos", pago.updatePagos.bind(pago));

router.put("/modificarPago/:id", pago.updateOnePago.bind(pago));

router.get("/cargarPagosERpendientes", pago.getPagosRemplazosPendientes.bind(pago));

router.get("/buscarPagoERpendientes/:id", pago.findPagosRemplazosPendientes.bind(pago));

router.post("/aplicarDescuentoPago", pago.aplicarDescuentoPago.bind(pago));

router.post("/calcularTotalPagos", pago.calcularTotalPagos.bind(pago));

router.get("/buscarPago/:id", pago.findPago.bind(pago));

router.get("/buscarPagosClientePendiente/:id", pago.buscarPagosClientePendiente.bind(pago));

router.get("/cargarPagosClientes", pago.cargarPagosClientes.bind(pago));

router.put("/actualizarUnPagoAPagado/:id", pago.actualizarUnPagoPendiente.bind(pago));

module.exports = router;