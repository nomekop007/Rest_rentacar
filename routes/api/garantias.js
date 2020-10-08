const router = require("express").Router();
const Garantia_controller = require("../../controllers/garantia_controller");
const garantia = new Garantia_controller();

router.post("/registrarGarantia", garantia.createGarantia.bind(garantia));

module.exports = router;