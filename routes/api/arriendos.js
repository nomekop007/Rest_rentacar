const router = require("express").Router();
const ArriendoController = require("../../controllers/arriendo_controller");
const arriendo = new ArriendoController();

router.post("/cargarTotalArriendos", arriendo.getArriendos.bind(arriendo));

router.post(
    "/cargarArriendosListos",
    arriendo.getArriendosListos.bind(arriendo)
);

router.get("/buscarArriendo/:id", arriendo.findArriendo.bind(arriendo));

router.post("/registrarArriendo", arriendo.createArriendo.bind(arriendo));

router.put("/cambiarEstadoArriendo/:id", arriendo.stateArriendo.bind(arriendo));

router.post("/enviarCorreoArriendo", arriendo.sendEmail.bind(arriendo));

module.exports = router;