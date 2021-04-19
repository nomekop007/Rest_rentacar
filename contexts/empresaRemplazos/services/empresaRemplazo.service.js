class EmpresaRemplazoService {

    constructor({ EmpresaRemplazoBusiness }) {
        this._empresaRemplazoBusiness = EmpresaRemplazoBusiness;
    }

    async getEmpresasRemplazo() {
        return await this._empresaRemplazoBusiness.getEmpresasRemplazo();
    }

    async createRemplazo(remplazo) {
        return await this._empresaRemplazoBusiness.createRemplazo(remplazo);
    }

    async createTarifaEmpresaReemplazo(tarifa) {
        return await this._empresaRemplazoBusiness.createTarifaEmpresaReemplazo(tarifa);
    }

}

module.exports = EmpresaRemplazoService;