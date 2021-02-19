const router = require("express").Router();
module.exports = ({ ApiFinanzasComponent }) => {

    router.get("/mostrarArriendoFinanzas", ApiFinanzasComponent.getArriendoFinanzas.bind(ApiFinanzasComponent));
    router.get("/buscarArriendoFinanzas/:id", ApiFinanzasComponent.findArriendoFinanzas.bind(ApiFinanzasComponent));
    router.post("/buscarDocumentosArriendoFinanzas/", ApiFinanzasComponent.findDocumentosArriendoFinanzas.bind(ApiFinanzasComponent));

    return router;
}

