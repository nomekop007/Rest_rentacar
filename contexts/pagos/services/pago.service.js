
class PagoService {

    constructor({ PagoBusiness }) {
        this.pagoBusiness = PagoBusiness;
    }

    async createPagoExtra(payload) {
        return await this.pagoBusiness.createPagoExtra(payload);
    }

    async cargarPagosExtrasPorArriendo(id_arriendo) {
        return await this.pagoBusiness.cargarPagosExtrasPorArriendo(id_arriendo);
    }

    async detelePagoExtra(id_pagoExtra) {
        return await this.pagoBusiness.detelePagoExtra(id_pagoExtra);
    }

    async actualizarPagosExtras(id_facturacion, arrayPagosExtra) {
        return await this.pagoBusiness.actualizarPagosExtras(id_facturacion, arrayPagosExtra)
    }



}

module.exports = PagoService;