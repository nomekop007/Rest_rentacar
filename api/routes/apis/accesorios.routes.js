const router = require("express").Router();
module.exports = ({ AccesorioController }) => {

    router.get("/cargarAccesorios", AccesorioController.getAccesorios.bind(AccesorioController));
    router.get("/cargarAccesoriosPorSucursal/:id", AccesorioController.getAccesoriosBySucursal.bind(AccesorioController));
    router.get("/buscarAccesorio/:id", AccesorioController.findAccesorio.bind(AccesorioController));
    router.post("/registrarAccesorio", AccesorioController.createAccesorio.bind(AccesorioController));
    router.put("/editarAccesorio/:id", AccesorioController.updateAccesorio.bind(AccesorioController));

    return router;
}


