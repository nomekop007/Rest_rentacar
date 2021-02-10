const router = require("express").Router();
const Contrato_controller = require("../../controllers/contrato.controller");
const { subirDocumentoContrato } = require("../../middlewares/upload.middleware");
const contrato = new Contrato_controller();

router.post("/registrarContrato", contrato.createContrato.bind(contrato));

router.post("/registrarExtencionContrato", contrato.createExtencionContrato.bind(contrato));

router.post("/generarPDFcontrato", contrato.generatePDFContrato.bind(contrato));

router.post("/generarPDFextencion", contrato.generatePDFExtencion.bind(contrato));

router.post("/enviarCorreoContrato", contrato.sendEmailContrato.bind(contrato));

router.post("/enviarCorreoContratoExtencion", contrato.sendEmailContratoExtencion.bind(contrato));

router.post("/subirContrato/:id", subirDocumentoContrato, contrato.subirContrato.bind(contrato));

router.post("/subirExtencionContrato/:id", subirDocumentoContrato, contrato.subirExtencionContrato.bind(contrato));





module.exports = router;