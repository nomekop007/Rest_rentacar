const router = require("express").Router();
module.exports = ({ ContratoController, subirDocumentoContrato }) => {

    router.post("/registrarContrato", ContratoController.createContrato.bind(ContratoController));
    router.post("/registrarExtencionContrato", ContratoController.createExtencionContrato.bind(ContratoController));
    router.post("/generarPDFcontrato", ContratoController.generatePDFContrato.bind(ContratoController));
    router.post("/generarPDFextencion", ContratoController.generatePDFExtencion.bind(ContratoController));
    router.post("/enviarCorreoContrato", ContratoController.sendEmailContrato.bind(ContratoController));
    router.post("/enviarCorreoContratoExtencion", ContratoController.sendEmailContratoExtencion.bind(ContratoController));
    router.post("/subirContrato/:id", subirDocumentoContrato, ContratoController.subirContrato.bind(ContratoController));
    router.post("/subirExtencionContrato/:id", subirDocumentoContrato, ContratoController.subirExtencionContrato.bind(ContratoController));

    return router;

}

