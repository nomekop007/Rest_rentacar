
class PagoExtraService {

    constructor({ PagoExtraBusiness }) {
        this.pagoExtraBusiness = PagoExtraBusiness;
    }

    async createPagoExtra(payload) {
        return await this.pagoExtraBusiness.createPagoExtra(payload);
    }

    async cargarPagosExtrasPorArriendo(id_arriendo) {
        return await this.pagoExtraBusiness.cargarPagosExtrasPorArriendo(id_arriendo);
    }



}

module.exports = PagoExtraService;