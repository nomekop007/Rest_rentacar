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

    async detelePagoExtra(id_pagoExtra) {
        await this._pagoExtraRepository.deleteById(id_pagoExtra);
    }

    async actualizarPagosExtras(id_facturacion, arrayPagosExtra) {
        arrayPagosExtra.forEach(async (id_pagoExtra) => {
            let data = { id_facturacion: id_facturacion };
            await this._pagoExtraRepository.putUpdateByID(data, id_pagoExtra);
        })
        return true;
    }


}

module.exports = PagoBusiness;