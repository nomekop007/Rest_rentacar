const router = require("express").Router();
const Contrato_controller = require("../../controllers/contrato_controller");
const contrato = new Contrato_controller();

router.post("/generarPDFcontrato", contrato.generatePDFContrato.bind(contrato));
router.post("/registrarContrato", contrato.createContrato.bind(contrato));

module.exports = router;