class UtilsService {

    constructor({ UtilsBusiness }) {
        this._utilsBusiness = UtilsBusiness;
    }

    async findDocumento(documento, tipo) {
        return await this._utilsBusiness.findDocumento(documento, tipo);
    }

    async rollbackVistaFirma(id_arriendo) {
        return await this._utilsBusiness.rollbackVistaFirma(id_arriendo);
    }

    async rollbackVistaPago(id_arriendo) {
        return await this._utilsBusiness.rollbackVistaPago(id_arriendo);
    }

    async rollbackVistaRequisito(id_arriendo) {
        return await this._utilsBusiness.rollbackVistaRequisito(id_arriendo);
    }

}

module.exports = UtilsService;