const router = require("express").Router();
const PagoAccesorio_controller = require("../../controllers/pagoAccesorio.controller");
const pagoAccesorio = new PagoAccesorio_controller();

router.post(
    "/registrarPagosAccesorios",
    pagoAccesorio.createPagoAccesorios.bind(pagoAccesorio)
);

module.exports = router;