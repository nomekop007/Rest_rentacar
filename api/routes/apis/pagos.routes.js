const router = require("express").Router();
module.exports = ({ PagoController }) => {

    router.post("/registrarPago", PagoController.createPago.bind(PagoController));
    router.post("/actualizarPagos", PagoController.updatePagos.bind(PagoController));
    router.put("/modificarPago/:id", PagoController.updateOnePago.bind(PagoController));
    router.get("/cargarPagosERpendientes", PagoController.getPagosRemplazos.bind(PagoController));
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

    return router;
}

