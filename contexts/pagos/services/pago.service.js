class PagoService {

    constructor({ PagoBusiness }) {
        this._pagoBusiness = PagoBusiness;
    }

    async registrarPagoExtra(monto, tipo, descripcion, idArriendo, userAt) {
        return await this._pagoBusiness.registrarPagoExtra(monto, tipo, descripcion, idArriendo, userAt);
    }

    async mostrarPagoExtrasPorArriendo(id_arriendo) {
        return await this._pagoBusiness.mostrarPagoExtrasPorArriendo(id_arriendo);
    }

    async detelePagoExtra(id_pagoExtra) {
        return await this._pagoBusiness.detelePagoExtra(id_pagoExtra);
    }

    async actualizarPagosExtras(id_facturacion, arrayPagosExtra) {
        return await this._pagoBusiness.actualizarPagosExtras(id_facturacion, arrayPagosExtra)
    }

    async createPago(pago) {
        return await this._pagoBusiness.createPago(pago)
    }

    async calcularTotalPagos(arrayPagos) {
        return await this._pagoBusiness.calcularTotalPagos(arrayPagos);
    }

    async updatePagos(id_facturacion, estado_pago, arrayPagos) {
        return await this._pagoBusiness.updatePagos(id_facturacion, estado_pago, arrayPagos);
    }

    async updateOnePago(pago, pagoArriendo, id_pago, userAt) {
        return await this._pagoBusiness.updateOnePago(pago, pagoArriendo, id_pago, userAt);
    }

    async getPagosRemplazos(id_sucursal) {
        return await this._pagoBusiness.getPagosRemplazos(id_sucursal);
    }

    async findPagosRemplazosPendientes(id_empresaRempalzo) {
        return await this._pagoBusiness.findPagosRemplazosPendientes(id_empresaRempalzo);
    }

    async findPago(id_pago) {
        return await this._pagoBusiness.findPago(id_pago);
    }

    async aplicarDescuentoPago(dias_restantes, descuento_pago, extra_pago, observacion_pago, arrayPagos) {
        return await this._pagoBusiness.aplicarDescuentoPago(dias_restantes, descuento_pago, extra_pago, observacion_pago, arrayPagos);
    }

    async buscarPagosClientePendiente(id_arriendo) {
        return await this._pagoBusiness.buscarPagosClientePendiente(id_arriendo);
    }

    async cargarPagosClientes(id_sucursal) {
        return await this._pagoBusiness.cargarPagosClientes(id_sucursal);
    }

    async actualizarUnPagoPendiente(id_facturacion, estado_pago, id_pago) {
        return await this._pagoBusiness.actualizarUnPagoPendiente(id_facturacion, estado_pago, id_pago);
    }

    async actualizarMontoPago(nuevo_monto, id_pago) {
        return await this._pagoBusiness.actualizarMontoPago(nuevo_monto, id_pago);
    }

    async createPagoDanio(pagoDanio) {
        return await this._pagoBusiness.createPagoDanio(pagoDanio);
    }

    async createPagoArriendo(pagoArriendo) {
        return await this._pagoBusiness.createPagoArriendo(pagoArriendo);
    }

    async consultarPagosArriendo(id_arriendo) {
        return await this._pagoBusiness.consultarPagosArriendo(id_arriendo);
    }

    async consultarTotalPagosArriendo(id_arriendo) {
        return await this._pagoBusiness.consultarTotalPagosArriendo(id_arriendo);
    }

    async createPagoAccesorios(id_pagoArriendo, userAt, matrizAccesorios) {
        return await this._pagoBusiness.createPagoAccesorios(id_pagoArriendo, userAt, matrizAccesorios);
    }

    async getFacturacion() {
        return await this._pagoBusiness.getFacturacion();
    }

    async createFacturacion(facturacion) {
        return await this._pagoBusiness.createFacturacion(facturacion);
    }

    async uploadDocumentFacturacion(documento_facturacion, id_facturacion) {
        return await this._pagoBusiness.uploadDocumentFacturacion(documento_facturacion, id_facturacion);
    }

    async createAbonoWithFacturacion(payloand) {
        return await this._pagoBusiness.createAbonoWithFacturacion(payloand);
    }

}

module.exports = PagoService;