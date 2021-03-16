const router = require("express").Router();
module.exports = ({ ArriendoController }) => {

    router.get("/cargarArriendos", ArriendoController.getArriendos.bind(ArriendoController));
    router.get("/buscarArriendo/:id", ArriendoController.findArriendo.bind(ArriendoController));
    router.get("/cargarArriendosActivos", ArriendoController.getArriendosActivos.bind(ArriendoController));
    router.post("/registrarArriendo", ArriendoController.createArriendo.bind(ArriendoController));
    router.put("/cambiarEstadoArriendo/:id", ArriendoController.updateStateArriendo.bind(ArriendoController));
    router.get("/enviarCorreoAtraso", ArriendoController.sendCorreoAtraso.bind(ArriendoController));
    router.put("/editarArriendo/:id", ArriendoController.updateArriendo.bind(ArriendoController));
    router.put("/cambiarTipoArriendo/:id", ArriendoController.modificarTipo.bind(ArriendoController));
    router.get("/finalizarArriendosRecepcionados", ArriendoController.finalizarArriendos.bind(ArriendoController));
    router.post("/anularArriendo", ArriendoController.anularArriendo.bind(ArriendoController));

    return router;

}
