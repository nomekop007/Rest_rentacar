const router = require("express").Router();
const ArriendoController = require("../../controllers/arriendo.controller");
const arriendo = new ArriendoController();

router.get("/cargarArriendos", arriendo.getArriendos.bind(arriendo));

router.get("/buscarArriendo/:id", arriendo.findArriendo.bind(arriendo));

router.get("/cargarArriendosActivos", arriendo.getArriendosActivos.bind(arriendo));

router.post("/registrarArriendo", arriendo.createArriendo.bind(arriendo));

router.put("/cambiarEstadoArriendo/:id", arriendo.updateStateArriendo.bind(arriendo));

router.get("/enviarCorreoAtraso", arriendo.sendCorreoAtraso.bind(arriendo));


module.exports = router;