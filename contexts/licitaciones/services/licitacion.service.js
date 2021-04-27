class LicitacionService {

    constructor({ LicitacionBusiness }) {
        this._licitacionBusiness = LicitacionBusiness;
    }

    async getLicitaciones() {
        return await this._licitacionBusiness.getLicitaciones();
    }


    async getIngresosLicitaciones() {
        return await this._licitacionBusiness.getIngresosLicitaciones();
    }


    async createIngresoLicitacion(ingresoLicitacion) {
        return await this._licitacionBusiness.createIngresoLicitacion(ingresoLicitacion);
    }


    async uploadRespaldoIngresoLicitacion(usertAt, documento, id_ingresoLicitacion) {
        return await this._licitacionBusiness.uploadRespaldoIngresoLicitacion(usertAt, documento, id_ingresoLicitacion);
    }



}

module.exports = LicitacionService;