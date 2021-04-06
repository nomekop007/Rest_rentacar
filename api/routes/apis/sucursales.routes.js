const router = require("express").Router();
module.exports = ({ SucursalController }) => {

    router.get("/cargarSucursales", SucursalController.getSucursales.bind(SucursalController));
    router.post("/crearSucursal", SucursalController.createSucursal.bind(SucursalController));
    router.put("/editarSucursal/:id", SucursalController.updateSucursal.bind(SucursalController));
    router.get("/arriendosPorSucursales", SucursalController.getFindArriendoBySucursal.bind(SucursalController));
    router.get("/buscarSucursal/:id", SucursalController.findSucursalById.bind(SucursalController));

    router.get("/cargarRegiones", SucursalController.getRegiones.bind(SucursalController));

    router.post("/registrarTrasladoOrigen", SucursalController.createTrasladoOrigen.bind(SucursalController));


    return router;
}

