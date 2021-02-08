const router = require("express").Router();
const ExtencionController = require("../../controllers/extencion.controller");
const extencion = new ExtencionController();

router.get("/buscarExtencionesPorArriendo/:id", extencion.buscarExtencionesPorArriendo.bind(extencion));

router.post("/registrarExtencion", extencion.createExtencionArriendo.bind(extencion));

module.exports = router;