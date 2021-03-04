class EmpresaRemplazoBusiness {

    constructor({ EmpresaRemplazoRepository, RemplazoRepository }) {
        this._remplazoRepository = RemplazoRepository;
        this._empresaRemplazoRepository = EmpresaRemplazoRepository;
    }


    async getEmpresasRemplazo() {
        const empresasRemplazo = await this._empresaRemplazoRepository.getFindAll();
        return empresasRemplazo;
    }

    async createRemplazo(remplazo) {
        const remplazoRepo = await this._remplazoRepository.postCreate(remplazo);
        return remplazoRepo;

    }

}

module.exports = EmpresaRemplazoBusiness;