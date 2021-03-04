class EmpresaRemplazoService {

    constructor({ EmpresaRemplazoBusiness }) {
        this._empresaRemplazoService = EmpresaRemplazoBusiness;
    }

    async getEmpresasRemplazo() {
        return await this._empresaRemplazoService.getEmpresasRemplazo();
    }

    async createRemplazo(remplazo) {
        return await this._empresaRemplazoService.createRemplazo(remplazo);
    }

}

module.exports = EmpresaRemplazoService;