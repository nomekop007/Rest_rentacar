const router = require("express").Router();
const ArriendoController = require("../../controllers/arriendo_controller");
const arriendo = new ArriendoController();

router.post("/cargarArriendos", arriendo.getArriendos.bind(arriendo));

router.get("/buscarArriendo/:id", arriendo.findArriendo.bind(arriendo));

router.post("/registrarArriendo", arriendo.createArriendo.bind(arriendo));

router.put("/cambiarEstadoArriendo/:id", arriendo.updateStateArriendo.bind(arriendo));

module.exports = router;