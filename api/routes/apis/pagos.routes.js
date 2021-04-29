const router = require("express").Router();
module.exports = ({ PagoController, subirDocumentoFacturacion }) => {

    router.post("/registrarPago", PagoController.createPago.bind(PagoController));
    router.post("/actualizarPagos", PagoController.updatePagos.bind(PagoController));
    router.put("/modificarPago/:id", PagoController.updateOnePago.bind(PagoController));

    router.get("/cargarPagosERpendientes", PagoController.getPagosRemplazos.bind(PagoController));
    router.get("/buscarPagoERpendientesConFiltro", PagoController.buscarPagoERpendientesConFiltro.bind(PagoController));
    router.get("/buscarPagoERpendientes/:id", PagoController.findPagosRemplazosPendientes.bind(PagoController));
    router.post("/aplicarDescuentoPago", PagoController.aplicarDescuentoPago.bind(PagoController));
    router.post("/calcularTotalPagos", PagoController.calcularTotalPagos.bind(PagoController));
    router.get("/buscarPago/:id", PagoController.findPago.bind(PagoController));
    router.get("/buscarPagosClientePendiente/:id", PagoController.buscarPagosClientePendiente.bind(PagoController));
    router.get("/cargarPagosClientes", PagoController.cargarPagosClientes.bind(PagoController));
    router.put("/actualizarUnPagoAPagado/:id", PagoController.actualizarUnPagoPendiente.bind(PagoController));
    router.put("/actualizarMontoPago/:id", PagoController.actualizarMontoPago.bind(PagoController));
    router.post("/registrarPagoExtra", PagoController.registrarPagoExtra.bind(PagoController));
    router.get("/cargarPagosExtrasPorArriendo/:id", PagoController.mostrarPagoExtrasPorArriendo.bind(PagoController));
    router.delete("/eliminarPagoExtra/:id", PagoController.detelePagoExtra.bind(PagoController));
    router.post("/actualizarPagosExtras", PagoController.actualizarPagosExtras.bind(PagoController));

    router.post("/registrarAbono", PagoController.createAbonoWithFacturacion.bind(PagoController));

    router.get("/cargarFacturaciones", PagoController.getFacturacion.bind(PagoController));
    router.post("/registrarFacturacion", PagoController.createFacturacion.bind(PagoController));
    router.post("/guardarDocumentoFacturacion/:id", subirDocumentoFacturacion, PagoController.uploadDocumentFacturacion.bind(PagoController))

    router.post("/registrarPagosAccesorios", PagoController.createPagoAccesorios.bind(PagoController));

    router.post("/registrarPagoArriendo", PagoController.createPagoArriendo.bind(PagoController));
    router.get("/consultarPagosArriendo/:id", PagoController.consultarPagosArriendo.bind(PagoController));
    router.get("/consultarTotalPagosArriendo/:id", PagoController.consultarTotalPagosArriendo.bind(PagoController));

    router.post("/registrarPagoDanio", PagoController.createPagoDanio.bind(PagoController));


    return router;
}

