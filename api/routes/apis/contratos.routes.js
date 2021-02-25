const router = require("express").Router();
module.exports = ({ ArriendoController, subirDocumentoContrato }) => {

    router.post("/registrarContrato", ArriendoController.createContrato.bind(ArriendoController));
    router.post("/registrarExtencionContrato", ArriendoController.createExtencionContrato.bind(ArriendoController));
    router.post("/generarPDFcontrato", ArriendoController.generatePDFContrato.bind(ArriendoController));
    router.post("/generarPDFextencion", ArriendoController.generatePDFExtencion.bind(ArriendoController));
    router.post("/enviarCorreoContrato", ArriendoController.sendEmailContrato.bind(ArriendoController));
    router.post("/enviarCorreoContratoExtencion", ArriendoController.sendEmailContratoExtencion.bind(ArriendoController));
    router.post("/subirContrato/:id", subirDocumentoContrato, ArriendoController.subirContrato.bind(ArriendoController));
    router.post("/subirExtencionContrato/:id", subirDocumentoContrato, ArriendoController.subirExtencionContrato.bind(ArriendoController));

    return router;

}

