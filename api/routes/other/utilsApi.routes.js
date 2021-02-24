const router = require("express").Router();
module.exports = ({ ApiUtilsComponent }) => {

    router.post("/buscarDocumento", ApiUtilsComponent.findDocumento.bind(ApiUtilsComponent));
    router.delete("/reiniciarVistaFirma/:id", ApiUtilsComponent.rollbackVistaFirma.bind(ApiUtilsComponent));
    router.delete("/reiniciarVistaPago/:id", ApiUtilsComponent.rollbackVistaPago.bind(ApiUtilsComponent));
    router.delete("/reiniciarVistaRequisito/:id", ApiUtilsComponent.rollbackVistaRequisito.bind(ApiUtilsComponent));

    return router;
}



