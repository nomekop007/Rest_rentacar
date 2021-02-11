const router = require("express").Router();
module.exports = ({ FacturacionController, subirDocumentoFacturacion }) => {

    router.get("/cargarFacturaciones", FacturacionController.getFacturacion.bind(FacturacionController));
    router.post("/registrarFacturacion", FacturacionController.createFacturacion.bind(FacturacionController));
    router.post("/guardarDocumentoFacturacion/:id", subirDocumentoFacturacion, FacturacionController.uploadDocumentFacturacion.bind(FacturacionController))

    return router;
}
