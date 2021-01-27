const router = require("express").Router();
const AccesorioController = require("../../controllers/accesorio.controller");
const accesorio = new AccesorioController();

router.get("/cargarAccesorios", accesorio.getAccesorios.bind(accesorio));

router.get("/cargarAccesoriosPorSucursal/:id", accesorio.getAccesoriosBySucursal.bind(accesorio));

router.get("/buscarAccesorio/:id", accesorio.findAccesorio.bind(accesorio));

router.post("/registrarAccesorio", accesorio.createAccesorio.bind(accesorio));

router.put("/editarAccesorio/:id", accesorio.updateAccesorio.bind(accesorio));

module.exports = router;