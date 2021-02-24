class PagoBusiness {

    constructor({ PagoExtraRepository }) {
        this._pagoExtraRepository = PagoExtraRepository;
    }



    async createPagoExtra(payload) {
        const { monto, descripcion, idArriendo, userAt } = payload;
        const dataPagoExtra = {
            monto_pagoExtra: monto,
            detalle_pagoExtra: descripcion,
            id_arriendo: idArriendo,
            userAt: userAt
        }
        const pagoExtra = await this._pagoExtraRepository.postCreate(dataPagoExtra);
        return pagoExtra;
    }



    async cargarPagosExtrasPorArriendo(id_arriendo) {
        const pagosExtras = await this._pagoExtraRepository.findAllByIdArriendo(id_arriendo);
        return pagosExtras;
    }




}

module.exports = PagoBusiness;