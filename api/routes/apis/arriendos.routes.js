const router = require("express").Router();
module.exports = ({ ArriendoController, subirDocumentoContrato, subirDocumentoRequisitosArriendo }) => {

    router.get("/cargarArriendos", ArriendoController.getArriendos.bind(ArriendoController));
    router.get("/cargarArriendosEnproceso", ArriendoController.getArriendosEnproceso.bind(ArriendoController));
    router.get("/buscarArriendo/:id", ArriendoController.findArriendo.bind(ArriendoController));
    router.get("/cargarArriendosActivos", ArriendoController.getArriendosActivos.bind(ArriendoController));
    router.post("/registrarArriendo", ArriendoController.createArriendo.bind(ArriendoController));
    router.put("/cambiarEstadoArriendo/:id", ArriendoController.updateStateArriendo.bind(ArriendoController));
    router.get("/enviarCorreoAtraso", ArriendoController.sendCorreoAtraso.bind(ArriendoController));
    router.put("/editarArriendo/:id", ArriendoController.updateArriendo.bind(ArriendoController));
    router.put("/cambiarTipoArriendo/:id", ArriendoController.modificarTipo.bind(ArriendoController));
    router.get("/finalizarArriendosRecepcionados", ArriendoController.finalizarArriendos.bind(ArriendoController));
    router.post("/anularArriendo", ArriendoController.anularArriendo.bind(ArriendoController));

    router.post("/registrarContacto", ArriendoController.createContacto.bind(ArriendoController));
    router.put("/editarContacto/:id", ArriendoController.updateContacto.bind(ArriendoController));

    router.post("/registrarContrato", ArriendoController.createContrato.bind(ArriendoController));
    router.post("/registrarExtencionContrato", ArriendoController.createExtencionContrato.bind(ArriendoController));
    router.post("/generarPDFcontrato", ArriendoController.generatePDFContrato.bind(ArriendoController));
    router.post("/generarPDFextencion", ArriendoController.generatePDFExtencion.bind(ArriendoController));
    router.post("/enviarCorreoContrato", ArriendoController.sendEmailContrato.bind(ArriendoController));
    router.post("/enviarCorreoContratoExtencion", ArriendoController.sendEmailContratoExtencion.bind(ArriendoController));
    router.post("/subirContrato/:id", subirDocumentoContrato, ArriendoController.subirContrato.bind(ArriendoController));
    router.post("/subirExtencionContrato/:id", subirDocumentoContrato, ArriendoController.subirExtencionContrato.bind(ArriendoController));

    router.get("/buscarExtencionesPorArriendo/:id", ArriendoController.buscarExtencionesPorArriendo.bind(ArriendoController));
    router.post("/registrarExtencion", ArriendoController.createExtencionArriendo.bind(ArriendoController));

    router.post("/registrarGarantia", ArriendoController.createGarantia.bind(ArriendoController));

    router.post("/registrarRequisitoArriendo/:id", subirDocumentoRequisitosArriendo, ArriendoController.createRequisitoArriendo.bind(ArriendoController));


    return router;

}
