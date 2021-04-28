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

    async findAll() {
        return await this._empresaRemplazoBusiness.findAll();
    }
    async getAllTarifasPorEmpresa(ID) {
        return await this._empresaRemplazoBusiness.getAllTarifasPorEmpresa(ID);
    }
    async updateTarifasEmpresaReemplazo(ID,DATA) {
        return await this._empresaRemplazoBusiness.updateTarifasEmpresaReemplazo(ID,DATA);
    }
    async getAllPorEmpresaSucursal(DATA) {
        return await this._empresaRemplazoBusiness.getAllPorEmpresaSucursal(DATA);
    }

}

module.exports = EmpresaRemplazoService;