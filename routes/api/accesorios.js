const router = require("express").Router();
const AccesorioController = require("../../controllers/accesorio.controller");
const accesorio = new AccesorioController();

router.get("/cargarAccesorios", accesorio.getAccesorios.bind(accesorio));


module.exports = router;