const router = require("express").Router();
const Facturacion_controller = require("../../controllers/facturacion_controller");
const facturacion = new Facturacion_controller();

router.post(
    "/registrarFacturacion",
    facturacion.createFacturacion.bind(facturacion)
);

module.exports = router;