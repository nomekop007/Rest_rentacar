const router = require("express").Router();
const AbonoController = require("../../controllers/abono.controller");
const abono = new AbonoController();

router.post("/registrarAbono", abono.createAbonoWithFacturacion.bind(abono));

module.exports = router;