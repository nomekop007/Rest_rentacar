const router = require("express").Router();
module.exports = ({ SucursalController,subirFotosActaTrasladoOrigen,subirFotosActaTrasladoDestino }) => {

    router.get("/cargarSucursales", SucursalController.getSucursales.bind(SucursalController));
    router.post("/crearSucursal", SucursalController.createSucursal.bind(SucursalController));
    router.put("/editarSucursal/:id", SucursalController.updateSucursal.bind(SucursalController));
    router.get("/arriendosPorSucursales", SucursalController.getFindArriendoBySucursal.bind(SucursalController));
    router.get("/buscarSucursal/:id", SucursalController.findSucursalById.bind(SucursalController));

    router.get("/cargarRegiones", SucursalController.getRegiones.bind(SucursalController));

    router.post("/registrarTrasladoOrigen", SucursalController.createTrasladoOrigen.bind(SucursalController));
    router.delete("/eliminarTraslado/:id",SucursalController.deleteTraslado.bind(SucursalController));
    router.put("/editarTrasladoEstado/:id",SucursalController.updateTrasladoEstado.bind(SucursalController));
    router.get("/cargarTraslados",SucursalController.getAllTraslado.bind(SucursalController));
    router.get("/obtenerTraslado/:id",SucursalController.getTraslado.bind(SucursalController));
    router.post("/guardarFotosTrasladoOrigen/:id",subirFotosActaTrasladoOrigen, SucursalController.guardarFotosTrasladoOrigen.bind(SucursalController));
    router.post("/guardarFotosTrasladoDestino/:id",subirFotosActaTrasladoDestino, SucursalController.guardarFotosTrasladoDestino.bind(SucursalController));

    return router;
}

