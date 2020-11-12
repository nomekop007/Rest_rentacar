const router = require("express").Router();
const Despacho_controller = require("../../controllers/despacho_controller");
const despacho = new Despacho_controller();

router.post("/registrarDespacho", despacho.createDespacho.bind(despacho));

router.put("/registrarRevision/:id", despacho.addRevision.bind(despacho));

module.exports = router;