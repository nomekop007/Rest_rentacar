class LicitacionBusiness {

    constructor({ ClienteLicitacionRepository, IngresoLicitacionRepository, LicitacionRepository, RespaldoIngresoLicitacionRepository }) {
        this._clienteLicitacionRepository = ClienteLicitacionRepository;
        this._ingresoLicitacionRepository = IngresoLicitacionRepository;
        this._licitacionRepository = LicitacionRepository;
        this._respaldoIngresoLicitacionRepository = RespaldoIngresoLicitacionRepository;
    }

    async getLicitaciones() {
        const licitaciones = await this._licitacionRepository.getFindAll();
        return licitaciones;
    }


    async getIngresosLicitaciones() {
        const ingresosLicitaciones = await this._ingresoLicitacionRepository.getFindAll();
        return ingresosLicitaciones;
    }


    async createIngresoLicitacion(ingresoLicitacion) {
        const ingresosLicitaciones = await this._ingresoLicitacionRepository.create(ingresoLicitacion);
        return ingresosLicitaciones;
    }


    async uploadRespaldoIngresoLicitacion(usertAt, documento, id_ingresoLicitacion) {
        const respaldo = {
            usertAt: usertAt,
            documento_respadoIngresoLicitacion: documento,
            id_ingresoLicitacion: id_ingresoLicitacion
        }
        const ingresosLicitaciones = await this._respaldoIngresoLicitacionRepository.create(respaldo);
        return ingresosLicitaciones;
    }



}

module.exports = LicitacionBusiness;