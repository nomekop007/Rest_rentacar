class FinanzasService {

    constructor({ FinanzasBusiness }) {
        this._finazasbusiness = FinanzasBusiness;
    }

    async getArriendoFinanzas() {
        return await this._finazasbusiness.getArriendoFinanzas();
    }


    async findArriendoFinanza(id_arriendo) {
        return await this._finazasbusiness.findArriendoFinanza(id_arriendo);
    }


    async findDocumentosArriendoFinanzas(documento, tipo) {
        return await this._finazasbusiness.findDocumentosArriendoFinanzas(documento, tipo);
    }

    async getArriendoFinanzasV2() {
        return await this._finazasbusiness.getArriendoFinanzasV2();
    }

}

module.exports = FinanzasService;