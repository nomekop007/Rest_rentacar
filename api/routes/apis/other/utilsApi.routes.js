const router = require("express").Router();
module.exports = ({ ApiUtilsController }) => {

    router.post("/buscarDocumento", ApiUtilsController.findDocumento.bind(ApiUtilsController));
    router.delete("/reiniciarVistaFirma/:id", ApiUtilsController.rollbackVistaFirma.bind(ApiUtilsController));
    router.delete("/reiniciarVistaPago/:id", ApiUtilsController.rollbackVistaPago.bind(ApiUtilsController));
    router.delete("/reiniciarVistaRequisito/:id", ApiUtilsController.rollbackVistaRequisito.bind(ApiUtilsController));

    return router;
}



