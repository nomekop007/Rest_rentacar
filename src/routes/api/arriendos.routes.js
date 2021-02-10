const router = require("express").Router();
const ArriendoController = require("../../controllers/arriendo.controller");
const arriendo = new ArriendoController();

router.get("/cargarArriendos", arriendo.getArriendos.bind(arriendo));

router.get("/buscarArriendo/:id", arriendo.findArriendo.bind(arriendo));

router.get("/cargarArriendosActivos", arriendo.getArriendosActivos.bind(arriendo));

router.post("/registrarArriendo", arriendo.createArriendo.bind(arriendo));

router.put("/cambiarEstadoArriendo/:id", arriendo.updateStateArriendo.bind(arriendo));

router.get("/enviarCorreoAtraso", arriendo.sendCorreoAtraso.bind(arriendo));

router.put("/editarArriendo/:id", arriendo.updateArriendo.bind(arriendo));

router.put("/cambiarTipoArriendo/:id", arriendo.modificarTipo.bind(arriendo));

router.get("/finalizarArriendosRecepcionados", arriendo.finalizarArriendos.bind(arriendo));

module.exports = router;