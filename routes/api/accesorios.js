const router = require("express").Router();
const AccesorioController = require("../../controllers/accesorio_controller");
const accesorio = new AccesorioController();

router.get("/cargarAccesorios", accesorio.getAccesorios.bind(accesorio));

router.post("/registrarArriendoAccesorio", accesorio.createArriendoAccesorio.bind(accesorio));



module.exports = router;