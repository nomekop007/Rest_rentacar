const router = require("express").Router();
const Facturacion_controller = require("../../controllers/facturacion_controller");
const { subirDocumentoFacturacion } = require("../../middlewares/upload_middleware")
const facturacion = new Facturacion_controller();

router.get("/cargarFacturaciones", facturacion.getFacturacion.bind(facturacion));

router.post("/registrarFacturacion", facturacion.createFacturacion.bind(facturacion));

router.post("/guardarDocumentoFacturacion/:id", subirDocumentoFacturacion, facturacion.uploadDocumentFacturacion.bind(facturacion))

module.exports = router;