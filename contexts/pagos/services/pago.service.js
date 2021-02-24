
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



}

module.exports = PagoService;