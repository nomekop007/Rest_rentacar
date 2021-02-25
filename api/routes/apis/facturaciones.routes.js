const router = require("express").Router();
module.exports = ({ PagoController, subirDocumentoFacturacion }) => {

    router.get("/cargarFacturaciones", PagoController.getFacturacion.bind(PagoController));
    router.post("/registrarFacturacion", PagoController.createFacturacion.bind(PagoController));
    router.post("/guardarDocumentoFacturacion/:id", subirDocumentoFacturacion, PagoController.uploadDocumentFacturacion.bind(PagoController))

    return router;
}
