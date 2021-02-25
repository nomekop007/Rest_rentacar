const router = require("express").Router();
module.exports = ({ ApiFinanzasController }) => {

    router.get("/mostrarArriendoFinanzas", ApiFinanzasController.getArriendoFinanzas.bind(ApiFinanzasController));
    router.get("/buscarArriendoFinanzas/:id", ApiFinanzasController.findArriendoFinanzas.bind(ApiFinanzasController));
    router.post("/buscarDocumentosArriendoFinanzas/", ApiFinanzasController.findDocumentosArriendoFinanzas.bind(ApiFinanzasController));

    return router;
}

